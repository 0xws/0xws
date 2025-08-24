---
title: "Rust for TypeScript Developers"
slug: "rust-for-typescript-devs"
description: "A gentle but opinionated introduction to Rust for frontend engineers used to TypeScript."
tags: ["rust", "typescript", "systems programming"]
pubDate: 2025-07-26
---

If you’re a frontend dev exploring Rust, you’ll love its emphasis on type safety, performance, and tooling.

---

## 🤝 Similarities

- Strong static typing
- Good tooling (e.g. Cargo = npm)
- Expressive enums and pattern matching

---

## 🚧 Differences

- **Ownership model**
- **No garbage collection**
- **Compilation times** (slower, but worth it)

---

## ✨ Hello World in Rust

```rs
fn main() {
    println!("Hello, TypeScript dev!");
}
```

---

## 📦 Project Setup

```bash
cargo new hello-rust
cd hello-rust
cargo run
```

---

## 🧠 Borrowing vs. Ownership

```rs
fn greet(name: &str) {
    println!("Hello, {}", name);
}
```

You pass by reference using `&str`, not by value. Memory safety is enforced at compile time.

---

## 🧪 Enums vs. Discriminated Unions

Rust:

```rs
enum Role {
    Admin,
    User,
    Guest,
}
```

TypeScript:

```ts
type Role = "Admin" | "User" | "Guest";
```

---

## 📚 Error Handling

Rust uses `Result<T, E>` instead of exceptions:

```rs
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".into())
    } else {
        Ok(a / b)
    }
}
```

---

## 📌 Conclusion

Rust has a steep learning curve, but pays off long-term.

> If TypeScript is your safety net, Rust is your force field.

---

## 📘 Learning Resources

* [The Rust Book](https://doc.rust-lang.org/book/)
* [Rustlings](https://github.com/rust-lang/rustlings)
