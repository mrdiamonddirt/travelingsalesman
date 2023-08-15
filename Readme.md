# Traveling Saleman Problem

## Introduction

a little project i made with my son to learn and visualize the traveling salesman problem.

Overview of the Problem:
The traveling salesman problem is a problem in which a salesman has to visit a number of cities. The salesman wants to visit each city once and return to the starting city. The salesman wants to find the shortest path to visit all the cities.

The Amount of possible paths is the number of cities factorial. For example, if there are 5 cities, there are 5! (5 factorial) possible paths. 5! = 5 * 4 * 3 * 2 * 1 = 120 possible paths.

## Files
### BruteForce

- `index.html` - the main html file
- `script.js` - the main javascript file

Shows a visualization of the traveling salesman problem. The cities are randomly generated and the path script runs until the best path is found using a Brute Force Algorthm. The best path is then shown in red.

shows the number of possible routes, the number of routes checked, and the time it took to find the best path.

### Nearest Neighbor

- `index.html` - the main html file
- `script.js` - the main javascript file

Shows a visualization of the traveling salesman problem. The cities are randomly generated and the path script runs until the best path is found using a Nearest Neighbor Algorthm. The best path is then shown in red.

shows the number of possible routes, the number of routes checked, and the time it took to find the best path.

## TODO

- [ ] add more algorithms in seperate folders
- [x] nearest neighbor
- [ ] improve minimum spanning tree
- [ ] improve genetic algorithm
- [ ] add simulated annealing
- [ ] add ant colony optimization