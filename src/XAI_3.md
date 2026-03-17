# Explainable Hierarchical Monte Carlo Ensemble

They propose the model ["Explainable Hierarchical Monte Carlo Ensemble"][EHME].

## General ideas

- Hypothesis A (split dataset): the dataset can be split into independent regions, and each model is responsible for one region.
    This makes the dataset smaller, but on the flip-side the models required are simpler / explainable (stretching "explainable" somewhat).
- Hypothesis B (confidence passes on): Take a test input, how do we know which model to use? Using the model's "classification confidence".
- Hypothesis C (hierarchy): says that models can be hierarchically ordered.[^1]

So the "Explainable" (less complex models), "Hierarchy" (passing on the data point) and "Ensemble" (multiple models) in the title are explained.

## My questions so far

- "Machine learning models for classification can be trained without domain-specific knowledge" since any meaningful training involves domain-specific data (they mean sufficiently general maybe?)
- "However, they are not suitable for incorporating a Euclidean distance model." since deep learning can certainly use it, even for classification.

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.
Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.
Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: So far, it looks more like it involves passing whatever a model can't classify with enough confidence to the next model, and the next, and so on. But hierarchy may be obvious in next sections.
