import { BTNode } from "./TypeBT";

class BSTree<T> {
    root: BTNode<T> | null;

    constructor() {
        this.root = null;
    }

    insert(key: T): void {
        this.root = this.insertNode(this.root, key);
    }

    remove(key: T): void {
        this.root = this.removeNode(this.root, key);
    }

    insertNode(root: BTNode<T> | null, key: T): BTNode<T> {
        const newNode = { value: key, left: null, right: null } as BTNode<T>;
        if (root === null) {
            return newNode;
        }

        let curr = root;

        while (true) {
            if (key < curr.value) {
                if (curr.left === null) {
                    curr.left = newNode;
                    return root;
                } else {
                    curr = curr.left;
                }
            } else {
                if (curr.right === null) {
                    curr.right = newNode;
                    return root;
                } else {
                    curr = curr.right;
                }
            }
        }
    }

    removeNode(root: BTNode<T> | null, key: T): BTNode<T> | null {
        if (root === null) return root;

        if (key < root.value) {
            root.left = this.removeNode(root.left, key);
            return root;
        } else if (key > root.value) {
            root.right = this.removeNode(root.right, key);
            return root;
        }

        if (root.left === null) {
            const temp = root.right;
            root.right = null;
            return temp;
        } else if (root.right === null) {
            const temp = root.left;
            root.left = null;
            return temp;
        } else {
            let succParent: BTNode<T> = root;
            let succ: BTNode<T> = root.right;

            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.value = succ.value;

            return root;
        }
    }
}

export default BSTree;