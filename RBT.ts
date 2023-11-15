import { RBNode } from "./TypeBT";
import { RBColor } from "./TypeBT";

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

    public remove(n: T) {
        if (this.root == null)
            return;
 
        const node: RBNode<T> | null = this.search(this.root, n);
 
        if (node?.value != n)
            return;
 
        this.removeNode(node!);
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
                const gp = p.parent;
                const sibling = gp.right;
        
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
                const gp = p.parent;
                const sibling = gp?.left;
        
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

    private removeNode(node: RBNode<T>): void {
        const fixupNode = this.replace(node);
        const uvBlack = ((fixupNode === null || fixupNode.color === RBColor.B) && (node.color === RBColor.B));
        let parent = node.parent;
    
        if (fixupNode === null) {
            if (node === this.root)
                this.root = null;
            else {
                if (uvBlack)
                    this.adjustTreeDel(node);
    
                else if (this.sibling(node) !== null)
                    this.sibling(node)!.color = RBColor.R;
    
                if (this.isOnLeft(node))
                    parent!.left = null;
                else
                    parent!.right = null;
            }
            return;
        }
    
        if (node.left === null || node.right === null) {
            if (node === this.root) {
                node.value = fixupNode.value;
                node.left = node.right = null;
            } else {
                if (this.isOnLeft(node))
                    parent!.left = fixupNode;
                else
                    parent!.right = fixupNode;
    
                fixupNode!.parent = parent;
    
                if (uvBlack)
                    this.adjustTreeDel(fixupNode!);
                else
                    fixupNode!.color = RBColor.B;
            }
            return;
        }
    
        this.swapValues(fixupNode!, node);
        this.removeNode(fixupNode!);
    }

    private adjustTreeDel(node: RBNode<T> | null): void {
        if (node == this.root)
            return;
 
        const sibling = this.sibling(node);
        const parent = node?.parent;
 
        if (sibling == null)
            this.adjustTreeDel(parent!);
        else {
            if (sibling.color == RBColor.R) {
                parent!.color = RBColor.R;
                sibling.color = RBColor.B;
 
                if (this.isOnLeft(sibling))
                    this.rightRotate(parent!);
                else
                    this.leftRotate(parent!);
 
                this.adjustTreeDel(node);
            } else {
                if (this.hasRedChild(sibling)) {
                    if (sibling.left != null && sibling.left.color == RBColor.R) {
                        if (this.isOnLeft(sibling)) {
                            sibling.left.color = sibling.color;
                            sibling.color = parent!.color;
                            this.rightRotate(parent!);
                        } else {
                            sibling.left.color = parent!.color;
                            this.rightRotate(sibling);
                            this.leftRotate(parent!);
                        }
                    } else {
                        if (this.isOnLeft(sibling)) {
                            sibling.right!.color = parent!.color;
                            this.leftRotate(sibling);
                            this.rightRotate(parent!);
                        } else {
                            sibling.right!.color = sibling.color;
                            sibling.color = parent!.color;
                            this.leftRotate(parent!);
                        }
                    }
                    parent!.color = RBColor.B;
                } else {
                    sibling.color = RBColor.R;
                    if (parent!.color == RBColor.B)
                        this.adjustTreeDel(parent!);
                    else
                        parent!.color = RBColor.B;
                }
            }
        }
    }

    private replace(node: RBNode<T>): RBNode<T> | null {
        if (node.left !== null && node.right !== null)
            return this.successor(node.right);
    
        if (node.left === null && node.right === null)
            return null;
    
        if (node.left !== null)
            return node.left;
        else
            return node.right;
    }

    private swapValues(u: RBNode<T>, v: RBNode<T>): void {
        const temp = u.value;
        u.value = v.value;
        v.value = temp;
    }

    private isOnLeft(node: RBNode<T> | null): boolean {
        return node == node?.parent?.left;
    }

    private sibling(node: RBNode<T> | null): RBNode<T> | null {
        if (node?.parent == null)
            return null;
 
        if (this.isOnLeft(node))
            return node!.parent!.right;
 
        return node!.parent!.left;
    }

    private hasRedChild(node: RBNode<T>): boolean {
        return (node.left != null && node.left.color == RBColor.R) ||
               (node.right != null && node.right.color == RBColor.R);
    }

    private successor(node: RBNode<T>): RBNode<T> { 
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
