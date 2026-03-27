# Reference-based Coordinate Assignment

[RCA] is a dimensionality reduction method. Importantly, this implies we already have some representation available, which we may want to reduce.

The main idea could be conceptually represented as:

$$\mathbf{x}_d = distance(\mathbf{x}_n; \mathbf{a}_n, \mathbf{b}_n,\ldots, \mathbf{d}_n)$$

On the right hand side, the distance of each $n$ dimensional vector $\mathbf{a}\ldots{}\mathbf{d}$ to $x_n$ is calculated. Each of these vectors is a centroid calculated from a cluster of embeddings.

The result, on the left hand side, is a reduced $d$-dimensional sample vector $x_d$.

The method has useful properties:

1. Compared to a large vector, it is cheaper to use to train a model (and can still be accurate),
2. Compared to other dimensionality reduction methods, it is easier to extend,
3. With certain care, the dimensions may be interpretable.

[RCA]:https://chemrxiv.org/doi/full/10.26434/chemrxiv.15000944/v1
