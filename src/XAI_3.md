# Explainable Hierarchical Monte Carlo Ensemble

They propose the model ["Explainable Hierarchical Monte Carlo Ensemble"][EHME].

## General ideas

- Hypothesis A (split dataset): the dataset can be split into independent regions; each model is responsible for one region. The models required are simpler.
- Hypothesis B (confidence passes on): Take a test input, how do we know which model to use? Using the model's "classification confidence".
- Hypothesis C (hierarchy): says that models can be hierarchically ordered.[^1]

So the "Explainable" (simple models), "Hierarchical" (passing on) and "Ensemble" (multiple models) are contextualised.

The "Domain Independent" simply means using compound vectors pooled from atom hot-encoded vectors; that is, with little expert knowledge.

## Explainability
They analyse it in different stages: pre-modelling (i.e dataset and representation), modelling and post-modelling.

### Pre-modelling: Dataset and Representation

They favour zero-training approaches like ElemNet where the compound vectors are built normalising one-hot-encoded vectors of atoms: $v_c = \frac{1}{N}\sum n_a v_a$

Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.

### Modelling

They call the model Trained Detailed Centroids (TDC). How the centroids are trained is not shown, only how the probability of belonging to ith-class is predicted:

$$ P_i = \frac{1/d_i}{\sum_j^m 1/d_j}$$

Where $m$ is the number of classes (not elements) and the distances are euclidean to each class centroid.

- The smaller $d_i$ is (closer to centroid $i$) the larger $P_i$ is, since the term $1/d_i$ eventually dominates the sum.
- The larger $d_i$ is (far from centroid) the more it tends towards zero, the term contributes little to the sum.

The method uses $n\times{}m$ parameters given by $n$ number of features (length of atom-vector, since it's pooled atom vectors) and $m$ prediction classes.

## My questions so far

- "Machine learning models for classification can be trained without domain-specific knowledge" since any meaningful training involves domain-specific data (they mean sufficiently general maybe?)
    - Answer: yes, sufficiently basic to not be expert-knowledge. Just the hot-encoded vectors.
- "However, they are not suitable for incorporating a Euclidean distance model." since deep learning can certainly use it, even for classification.

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.
Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.
Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: So far, it looks more like it involves passing whatever a model can't classify with enough confidence to the next model, and the next, and so on. But hierarchy may be obvious in next sections.
