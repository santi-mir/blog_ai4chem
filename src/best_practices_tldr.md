# Best Practices

TL;DR from the paper ["Best practices in machine learning for chemistry"][best practices] (2021), a very similar paper by the same authors is ["Machine learning for molecular and materials science"][similar].

- _For Datasets_
    - Ensure dataset remains available, and is version-tagged (they change)
    - For home-made or mixes, explain the process of generation
    - Describe any data curation, balancing, augmentation, and so on.

- _For Representations_
    - Try more than one, compare
    - Use very basic ones as baseline representation to compare (example random or one-hot)

- _Justify Model_
    - More complex isn't always better
    - Compare to baselines (mean for regression, most common class for classification)
    - Compare to very simple models and to SOTA
    - Any interpretability we can offer?

- _Evaluate Model_
    - Have 3 separate datasets: for training and optimising, for evaluating during training and detect overfitting, and testing for testing which should represent where it will be applied (should test what we want it to succeed on).
    - Test extrapolative learning: leave out some class entirely, or train until a cutoff date and evaluate with dates after that.
    - Test intrapolative learning: with varied test sets
    - Mindful of shorcut learning (have varied test dataset).

- Results and code must be made available and reproducible

They also state:

> In all reports, remember to cite the methods and packages employed to ensure that the development community receive the recognition they deserve.

They provide a great checklist but since the license is a mess I am not including it here.

[best practices]: https://www.nature.com/articles/s41557-021-00716-z
[similar]: https://www.nature.com/articles/s41586-018-0337-2
