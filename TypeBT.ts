export type BTNode<T> = {
    value: T;
    left: BTNode<T> | null;
    right: BTNode<T> | null;
}

export type AVLNode<T> = {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    parent: AVLNode<T> | null;
    height: number;
}

export type RBNode<T> = {
    value: T;
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;
    color: RBColor;
}

export enum RBColor {
    B,
    R
}

export function find<T, N extends BTNode<T> | AVLNode<T> | RBNode<T>>(root: N | null, key: T): N | null {
    let curr = root as N;

    while (curr) {
        if (curr.value === key) {
            return curr;
        } else if (key > curr.value) {
            curr = curr.right as N;
        } else {
            curr = curr.left as N;
        }
    }

    return null;
}

export function getHeightTree<T, N extends BTNode<T> | AVLNode<T> | RBNode<T>>(root: N | null): number {
    if (!root) return 0;

    let height = 0;
    const queue: N[] = [root as N];

    while (queue.length) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const curr = queue.shift() as N;

            if (curr.left) {
                queue.push(curr.left as N);
            }
            if (curr.right) {
                queue.push(curr.right as N);
            }
        }

        height++;
    }

    return height;
}

const COUNT = 4;

export function print2D<T>(root: RBNode<T> | null, space: number = 0): void {
    if (root == null) return;
    space += COUNT;
    const color = root.color === RBColor.R ? "R" : "B";

    print2D(root.right, space);
    console.log(" ".repeat(space - COUNT) + root.value, color);
    print2D(root.left, space);
}