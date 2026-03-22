# Atom Vectors - Atom2Vec

A popular representation of atoms as vectors appeared in (2018): [Atom2Vec].

They take compounds from a database, and build a matrix like the one below:[^1]

|  |$\mathrm{(2)Sb_3}$|$\mathrm{(2)Se_3}$|$\mathrm{(2)Te_3}$|$\mathrm{(3)Bi_2}$|$\mathrm{(3)Sb_2}$|$\mathrm{(3)O_2}$|$\mathrm{(3)S_2}$|
| ----          | ---- | -----|------|------|------|-----|-----|
| $\mathrm{Bi}$| 1 | 1 |1|0|0|1 | 0 |
| $\mathrm{Sb}$ | 0 | 1 |1|1|0|0 | 1 |
| ... | 1 | 0 |1|0|0|1 | 1 |

Let's describe using the compound $\mathrm{Bi_2Sb_3}$ as an example:

- When $\mathrm{Bi}$ is the target, it generates $(2) \mathrm{Sb_3}$, placed in the first column. `(2)` is the stoichiometry of the element $\mathrm{Bi}$ in the compound.
- When $\mathrm{Sb}$ is the target it generates $\mathrm{(3) Bi_2}$, placed in the fourth column. `(3)` is the stoichiometry of the element $\mathrm{Sb}$ in the compound.

Since a particular atom binds to a very small fraction of all groups, each row is very sparse (high fraction of zeros). The same is valid for columns.

## SVD Method

A normalised matrix $X_u$ is obtained by normalising each row vector independently. Using the euclidean norm (2-norm) allows for an intuitive similarity metric:

$$\mathrm{dist}(\vec{u_1},\vec{u_2}) = 1 - \vec{u_1} \cdot \vec{u_2} = 1 - \mathrm{similarity}$$

In their best-performing model, they compute $SVD(X_u) = U\,D\,V^T$, collect the $d$-rows with the largest singular values, and compute $F = U'\,D'$ where $D'$ is the slice of rows of D with the $d$ largest singular values, and $U'$ the corresponding columns.

> [!NOTE]
> The strategy has certain beauty to it: the new f-vectors retain the inner product similarity but are denser. Though now, the columns have no explicit meaning.

### Findings

- Similar atoms have similar vectors,
- Increasing the distance threshold _in stages_, vectors can be clustered hierarchically, from the leaf-nodes (atoms) downwards (groups).
    - At some level, groups match the periodic table groups. (I don't know how the grouping is made unambiguous).
    - At a very large distance, all atoms merge into a single group. The result is called _dendogram_.

<div class="center w40">
    <a href="./assets/hierarchical_clusters.png">
        <img src="./assets/hierarchical_clusters.png" alt="Hierarchical clusters of atoms."/>
    </a>
    <p>
    Image (modified) from <a href="https://pnas.org/doi/full/10.1073/pnas.1801181115">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>. The atoms are rotated to make the image fit (rotated).
    </p>
</div>

- Looking at the variation of some dimensions in the vectors, we can assign meaning to some of them.

### Benches

Then, they compared to "empirical features" &mdash;a vector `(group, period,...)`, padded to match their $d$&mdash; with the task of predicting the DFT-found formation-energies of $\approx 10^4$ elpasolite crystals ($\mathrm{ABC_2D_6}$).

Each solid was represented as a concatenation of atom vectors, and feed it to a hidden layer. (They also do other tasks.)

The paper ends with an interesting insight:

> Structural information has to be taken into account to accurately model how atoms are bound together to form either environment or compound, where the recent development on recursive and graph-based neural networks might help.

[Atom2Vec]: https://arxiv.org/pdf/1807.05617
[^1]: It would be a binary matrix but the database contains some compounds multiple times and those are left duplicated (for some strange reason).
