---
title: Writing a lock-free ring buffer in Rust
date: 2026-03-01
tag: systems
---

Lock-free data structures are one of those topics that look straightforward on the surface — just use atomics, right? — but hide a swamp of subtle ordering hazards underneath. This post walks through building a single-producer, single-consumer (SPSC) ring buffer in Rust with no mutexes in sight.

## Why bother?

A mutex-protected queue is fine 99% of the time. But when one thread writes sensor data at 100 kHz and another thread drains it, you really don't want lock contention. Lock-free SPSC queues are the classic answer.

> "Premature optimisation is the root of all evil" — but sometimes you genuinely need the performance.

## The structure

A ring buffer is a fixed-size array with two indices: `head` (where the producer writes) and `tail` (where the consumer reads). The trick is ensuring both threads see consistent values without a lock.

```rust
use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;

pub struct RingBuffer<T, const N: usize> {
    buf:  [UnsafeCell<T>; N],
    head: AtomicUsize,
    tail: AtomicUsize,
}

unsafe impl<T: Send, const N: usize> Send for RingBuffer<T, N> {}
unsafe impl<T: Send, const N: usize> Sync for RingBuffer<T, N> {}
```

## Memory ordering

This is where most tutorials wave their hands. Here's the concrete reasoning:

- The producer writes data **before** it increments `head`.
- The consumer reads `head` **before** it reads data.
- So the `head` store needs `Release`; the load needs `Acquire`.

```rust
// producer
unsafe { *self.buf[slot].get() = value; }
self.head.store(next, Ordering::Release);

// consumer
let head = self.head.load(Ordering::Acquire);
if head == tail { return None; }
let value = unsafe { self.buf[tail].get().read() };
self.tail.store(next_tail, Ordering::Release);
```

The `Release`/`Acquire` pair forms a happens-before edge: anything the producer did before the store is visible to the consumer after the load.

## Benchmarks

| implementation | throughput (M ops/s) | latency p99 |
|----------------|----------------------|-------------|
| `Mutex<VecDeque>` | 42 | 1.8 µs |
| crossbeam channel | 180 | 0.4 µs |
| this SPSC buffer | 310 | 0.2 µs |

---

Full source is on [GitHub](https://github.com/abhibyte). Next up: extending this to multiple producers with a fetch-and-add index scheme.
