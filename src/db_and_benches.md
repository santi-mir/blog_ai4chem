# Databases, Benchmarks

Bear in mind when using databases what this [Machine learning for molecular and materials science][Perspective] states:

> Data may require initial pre-processing, during which missing or spurious elements are identified and handled.
>
> Identifying and removing such errors is essential if ML algorithms are not to be misled by their presence.

And same authors, on a [Best Practices for Machine Learning in Chemistry][Best Practices] paper:

> For reasons of reproducibility, it is crucial that these databases use some mechanism for version control (e.g. release numbers, Git versioning, or timestamps) as part of the metadata and maintain long-term availability to previous versions of the database.

- The [Machine Learning for molecular and materials science][Perspective] aggregates many DBs and such in tables at the end
- Pillong, M. et al. A publicly available crystallisation data set and its application in machine learning. CrystEngComm (2017).
- ICSD: Inorganic Crystal Structure Dataset
- Jain, A. et al. The materials project: a materials genome approach to accelerating materials innovation.
    - The materials project database <https://materialsproject.org/>
- Benchmarking materials property prediction methods: the matbench test set and automatminer reference algorithm.
    - Matbench benchmark: <https://hackingmaterials.lbl.gov/automatminer/datasets.html>
- Materials design and discovery with high-throughput density functional theory: the open quantum materials database (OQMD)

Also [ElemNet] lists materials-and-properties' databases (experimentally observed and hypothetical):

> DFT calculations have offered opportunities for large-scale data collection such as the Open Quantum Materials Database (OQMD), the Automatic Flow of Materials Discovery Library (AFLOWLIB), the Materials Project, and the Novel Materials Discovery (NoMaD); they contain DFT computed properties of ~104–106 of experimentally-observed and hypothetical materials. In the past few decades, such materials datasets have led to the new data-driven paradigm of materials informatics

ElemNet describes OQDM as well (bold is mine):

> OQMD is an extensive high-throughput DFT database, consisting of **DFT computed** crystallographic parameters and formation enthalpies of **experimentally observed compounds** taken from the Inorganic Crystal Structure Database (ICSD)63 **and hypothetical structures** created by decorating prototype structures from the ICSD with different compositions.

[Perspective]: https://www.nature.com/articles/s41586-018-0337-2
[Best Practices]: https://www.nature.com/articles/s41557-021-00716-z
[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
