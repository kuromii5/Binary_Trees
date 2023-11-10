import { BTNode } from "./TypeBT";
import { AVLNode } from "./TypeBT";
import { RBNode } from "./TypeBT";

export function preOrder<T, N extends BTNode<T> | AVLNode<T> | RBNode<T>>(curr: N | null, result: T[] = []): T[] {
    if (!curr) {
        return result;
    }

    result.push(curr.value);
    preOrder(curr.left, result);
    preOrder(curr.right, result);
    return result;
}

export function inOrder<T, N extends BTNode<T> | AVLNode<T> | RBNode<T>>(curr: N | null, result: T[] = []): T[] {
    if (!curr) {
        return result;
    }

    inOrder(curr.left, result);
    result.push(curr.value);
    inOrder(curr.right, result);
    return result;
}

export function postOrder<T, N extends BTNode<T> | AVLNode<T> | RBNode<T>>(curr: N | null, result: T[] = []): T[] {
    if (!curr) {
        return result;
    }

    postOrder(curr.left, result);
    postOrder(curr.right, result);
    result.push(curr.value);
    return result;
}