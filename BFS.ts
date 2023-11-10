import { BTNode } from "./TypeBT";

export function bfs<T>(head: BTNode<T>): T[] {
    const queue: (BTNode<T> | null)[] = [head];
    const result: T[] = [];

    while (queue.length) {
        const curr = queue.shift() as BTNode<T>;

        if (!curr) continue;

        result.push(curr.value);
        queue.push(curr.left);
        queue.push(curr.right);
    }

    return result;
}