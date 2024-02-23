# Binary Trees and Complexity measuring on TypeScript #

## About this project ##

This is my third study project in A&DS course. Here I've implemented Binary Search tree, AVL tree and Red-Black tree.
The measuring functions are located in main.ts file. The results of these measures are exported to the .xlsx files.

## Trees, their methods and functions ##

* Binary Search tree
* AVL tree
* Red-Black tree

Every tree has the next methods:

* insert
* remove

and functions:

* search
* getHeight
* print2D (beautiful representation of tree in console)

The tree is implemented as a class, and a Node is implemented as type. Every tree has it's own node type, but some functions like print, search and getHeight are independent.
So, you can use these functions on these trees, they are in TypeBT.ts file.

## Time measuring ##

In main.ts we are creating functions to measure execution time of a tree method or function and also functions for creating arrays, which is used to fill the tree.
Then we are repeating the process of creating arrays, using methods to insert and delete data in our trees, measuring the execution time of these methods or any functions associated with trees.
After all measurings we export results to .xlsx files.
