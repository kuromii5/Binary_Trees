import { RBNode } from "./TypeBT";
import { RBColor } from "./TypeBT";
import { print2D } from "./TypeBT";

class RBTree<T> {
    root: RBNode<T> | null;

    constructor() {
        this.root = null;
    }

    public insert(value: T): void {
        const newNode = { value, color: RBColor.R, left: null, right: null, parent: null };
        this.insertNode(newNode);
        if (newNode === this.root) newNode.color = RBColor.B;
    }
    
    private insertNode(node: RBNode<T>): void {
        let current: RBNode<T> | null = this.root;
        if (!current) {
            this.root = node;
            return;
        } else {
            let parent: RBNode<T> | null = null;
            
            while (current) {
                parent = current;
                if (node.value < current.value) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
            
            node.parent = parent;
            if (node.value < parent!.value) {
                parent!.left = node;
            } else {
                parent!.right = node;
            }
            
            this.adjustTreeIns(node);
        }
    }

    private adjustTreeIns(node: RBNode<T>): void {
        while (node !== this.root && node.parent?.color === RBColor.R) {
            let p = node.parent;
            if (p === p.parent?.left) {
                const sibling = p.parent?.right;
                let gp = p.parent;
        
                if (sibling?.color === RBColor.R) {
                    p.color = RBColor.B;
                    sibling.color = RBColor.B;
                    if (p.parent !== this.root) {
                        p.parent.color = RBColor.R;
                        node = p.parent;
                    }
                } else if (!sibling || sibling.color === RBColor.B) {
                    if (gp.left === p && p.right === node) {
                        if (node === p.right) 
                            this.leftRotate(p);
                        this.rightRotate(gp);
                    } else if (gp.left === p && p.left === node){
                        this.rightRotate(gp);
                        node = p;
                    }
                    node.color = RBColor.B;
                    node.right!.color = RBColor.R;
                    break;
                }
            } else {
                const sibling = p.parent?.left;
                let gp = p.parent;
        
                if (sibling?.color === RBColor.R) {
                    p.color = RBColor.B;
                    sibling.color = RBColor.B;
                    if (p.parent && p.parent !== this.root) {
                        p.parent.color = RBColor.R;
                        node = p.parent;
                    }
                } else if (!sibling || sibling.color === RBColor.B) {
                    if (gp!.right === p && p.left === node) {
                        if (node === p.left) 
                            this.rightRotate(p);
                        this.leftRotate(gp);
                    } else if (gp!.right === p && p.right === node) {
                        this.leftRotate(gp);
                        node = p;
                    }
                    node.color = RBColor.B;
                    node.left!.color = RBColor.R;
                    break;
                }
            }
        }
    
        this.root!.color = RBColor.B;
    }

    public remove(value: T) {
        const nodeToRemove = this.search(this.root, value);
        if (!nodeToRemove) return;
        this.removeNode(nodeToRemove);
    }

    private removeNode(nodeToRemove: RBNode<T>): void {
        let fixupNode: RBNode<T> | null = null;
        let replacementNode: RBNode<T> | null = null;

        if (!nodeToRemove.left || !nodeToRemove.right) {
            replacementNode = nodeToRemove;
        } else {
            replacementNode = this.successor(nodeToRemove.right);
        }

        if (replacementNode) {
            if (replacementNode.left) {
                fixupNode = replacementNode.left;
            } else {
                fixupNode = replacementNode.right;
            }
    
            if (fixupNode) {
                fixupNode.parent = replacementNode.parent;
            }
    
            if (!replacementNode.parent) {
                this.root = fixupNode;
            } else if (replacementNode === replacementNode.parent.left) {
                replacementNode.parent.left = fixupNode;
            } else {
                replacementNode.parent.right = fixupNode;
            }
    
            if (replacementNode !== nodeToRemove) {
                nodeToRemove.value = replacementNode.value;
            }
    
            if (replacementNode.color === RBColor.B) {
                this.adjustTreeDel(fixupNode);
            }
        }
    }

    private adjustTreeDel(node: RBNode<T> | null): void {
        if (!node) return;

        while (node !== this.root && node?.color === RBColor.B) {
            const p: RBNode<T> | null = node!.parent;
    
            if (p && node === p.left) {
                let sibling = p.right;
    
                if (sibling?.color === RBColor.R) {
                    sibling.color = RBColor.B;
                    p.color = RBColor.R;
                    this.leftRotate(p);
                    sibling = p.right;
                }
    
                if (sibling) {
                    if (sibling.left?.color === RBColor.B && sibling.right?.color === RBColor.B) {
                        sibling.color = RBColor.R;
                        node = p;
                    } else {
                        if (sibling.right?.color === RBColor.B && sibling.left) {
                            sibling.left.color = RBColor.B;
                            sibling.color = RBColor.R;
                            this.rightRotate(sibling);
                            sibling = p.right;
                        }
    
                        if (sibling) sibling.color = p.color;
                        p.color = RBColor.B;
                        if (sibling && sibling.right) sibling.right.color = RBColor.B;
                        this.leftRotate(p);
                        node = this.root;
                    }
                }
            } else if (p){
                let sibling = p.left;
    
                if (sibling?.color === RBColor.R) {
                    sibling.color = RBColor.B;
                    p.color = RBColor.R;
                    this.rightRotate(p);
                    sibling = p.left;
                }
    
                if (sibling) {
                    if (sibling.right?.color === RBColor.B && sibling.left?.color === RBColor.B) {
                        sibling.color = RBColor.R;
                        node = p;
                    } else {
                        if (sibling.left?.color === RBColor.B && sibling.right) {
                            sibling.right.color = RBColor.B;
                            sibling.color = RBColor.R;
                            this.leftRotate(sibling);
                            sibling = p.left;
                        }
    
                        if (sibling) sibling.color = p.color;
                        p.color = RBColor.B;
                        if (sibling && sibling.left) sibling.left.color = RBColor.B;
                        this.rightRotate(p);
                        node = this.root;
                    }
                }
            }
        }
    
        if (node) {
            node.color = RBColor.B;
        }
    }

    private successor(node: RBNode<T>): RBNode<T> | null { 
        let curr = node;
        while (curr.left != null) curr = curr.left; 
        return curr; 
    }

    public search(node: RBNode<T> | null, value: T): RBNode<T> | null {
        while (node && value !== node.value) {
            if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    private rightRotate(node: RBNode<T> | null): void {
        if (!node || !node.left) return;
        
        const x = node.left;
        node.left = x.right;
    
        if (x.right) 
            x.right.parent = node;
        x.parent = node.parent;
    
        this.updateRelationship(node, x)
    
        x.right = node;
        node.parent = x;
    }
    

    private leftRotate(node: RBNode<T> | null): void {
        if (!node || !node.right) return;
    
        const x = node.right;
        node.right = x.left;
    
        if (x.left) 
            x.left.parent = node;
        x.parent = node.parent;
    
        this.updateRelationship(node, x)
    
        x.left = node;
        node.parent = x;
    }

    private updateRelationship(node: RBNode<T>, temp: RBNode<T>): void {
        if (!node.parent) {
            this.root = temp;
        } else if (node === node.parent.left) {
            node.parent.left = temp;
        } else {
            node.parent.right = temp;
        }
    }
}

export default RBTree;