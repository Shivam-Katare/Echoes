export * from "./qoutes";
export * from "./words";

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}