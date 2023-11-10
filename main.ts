import * as XLSX from 'xlsx';
import AVLTree from "./AVL";
import BSTree from "./BST";
import RBTree from "./RBT";
import { preOrder, inOrder, postOrder } from "./BinaryTreeTraverse";
import { find, getHeightTree, print2D } from './TypeBT';

const startLength = 1000;

function measureExecutionTime(func: (...args: number[]) => void): number {
    const startTime = performance.now();
    func();
    const endTime = performance.now();

    const executionTime = endTime - startTime;
    return executionTime;
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData(length: number) {
    const data = new Set<number>();
    while (data.size < length) {
        data.add(getRandomNumber(1, length * 10));
    }
    return Array.from(data);
}

function generateOrderedData(length: number): number[] {
    const data: number[] = [];
    for (let i = 1; i <= length; i++) {
        data.push(i);
    }
    return data;
}

function generateOrderedDataDescending(length: number): number[] {
    const data: number[] = [];
    for (let i = length; i >= 1; i--) {
        data.push(i);
    }
    return data;
}

function main() {
    const resultsBSInsertion: { length: number; time: number; height: number }[] = [];
    const resultsAVLInsertion: { length: number; time: number; height: number }[] = [];
    const resultsRBInsertion: { length: number; time: number; height: number }[] = [];

    const resultsBSDeletion: { length: number; time: number }[] = [];
    const resultsAVLDeletion: { length: number; time: number }[] = [];
    const resultsRBDeletion: { length: number; time: number }[] = [];

    let lengths: number[] = [];
    for (let i = startLength; i <= 1000; i += 100) lengths.push(i);

    for (const length of lengths) {
        const randomData = generateRandomData(length);
        const orderedData = generateOrderedData(length);
        const descendingOrderedData = generateOrderedDataDescending(length);
        const bst = new BSTree<number>();
        const avl = new AVLTree<number>();
        const rb = new RBTree<number>();

        const bstInsertionTime = measureExecutionTime(() => {
            for (const value of orderedData) bst.insert(value);
        });
        const bstHeight = getHeightTree(bst.root);
        resultsBSInsertion.push({ length, time: bstInsertionTime, height: bstHeight });

        const avlInsertionTime = measureExecutionTime(() => {
            for (const value of orderedData) avl.insert(value);
        });
        const avlHeight = getHeightTree(avl.root);
        resultsAVLInsertion.push({ length, time: avlInsertionTime, height: avlHeight });

        const rbInsertionTime = measureExecutionTime(() => {
            for (const value of orderedData) rb.insert(value);
        });
        const rbHeight = getHeightTree(rb.root);
        resultsRBInsertion.push({ length, time: rbInsertionTime, height: rbHeight });

        const bstDeletionTime = measureExecutionTime(() => {
            for (const value of orderedData) {
                bst.remove(value);
            }
        });

        resultsBSDeletion.push({ length, time: bstDeletionTime });

        const avlDeletionTime = measureExecutionTime(() => {
            for (const value of orderedData) {
                avl.remove(value);
            }
        });

        resultsAVLDeletion.push({ length, time: avlDeletionTime });

        const rbDeletionTime = measureExecutionTime(() => {
            for (const value of orderedData) {
                rb.remove(value);
            }
        });

        resultsRBDeletion.push({ length, time: rbDeletionTime });
    }

    const wbInsertion = XLSX.utils.book_new();
    const bstInsertionSheet = XLSX.utils.json_to_sheet(resultsBSInsertion);
    const avlInsertionSheet = XLSX.utils.json_to_sheet(resultsAVLInsertion);
    const rbInsertionSheet = XLSX.utils.json_to_sheet(resultsRBInsertion);

    XLSX.utils.book_append_sheet(wbInsertion, bstInsertionSheet, 'BST');
    XLSX.utils.book_append_sheet(wbInsertion, avlInsertionSheet, 'AVL');
    XLSX.utils.book_append_sheet(wbInsertion, rbInsertionSheet, 'Red-Black');

    XLSX.writeFile(wbInsertion, 'tree_insertion_times.xlsx');

    const wbDeletion = XLSX.utils.book_new();
    const bstDeletionSheet = XLSX.utils.json_to_sheet(resultsBSDeletion);
    const avlDeletionSheet = XLSX.utils.json_to_sheet(resultsAVLDeletion);
    const rbDeletionSheet = XLSX.utils.json_to_sheet(resultsRBDeletion);

    XLSX.utils.book_append_sheet(wbDeletion, bstDeletionSheet, 'BST');
    XLSX.utils.book_append_sheet(wbDeletion, avlDeletionSheet, 'AVL');
    XLSX.utils.book_append_sheet(wbDeletion, rbDeletionSheet, 'Red-Black');

    XLSX.writeFile(wbDeletion, 'tree_deletion_times.xlsx');
}

main();