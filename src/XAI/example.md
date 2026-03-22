# Explainable Hierarchical Monte Carlo Ensemble

In the paper ["Domain Independent XAI for Material Science"][EHME] they propose the model Explainable Hierarchical Monte Carlo Ensemble (EHME).

## Terms

Let's clarify some words in the title and model name:

- **Domain Independent**: The vectors aren't expert-designed but _fractional_:
    - _Fractional_ means one-hot encoded elements, average pooled to make compound representations.
- **Explainable**: simpler models,
- **Hierarchical**: Involves passing on what isn't classified to other classifiers up the hierarchy,
- **Ensemble**: multiple models.

## Structure

Three interesting hypothesis structure the paper:

- Hypothesis A (split dataset): views the dataset as union of independent regions. For a region, the models required are simpler and more explainable.
- Hypothesis B (pass on): For a test item, its region _and_ class are unknown, so which model should be executed?[^1]
    - Litmus test: If $P_{max} \gt P_{max_2} + \delta$ then it is classified; else, pass the item to the next model up the hierarchy.
    - This is run until the item is classified.
    - They call each $P_i$ a _centroid_.
- Hypothesis C (hierarchy): models representing regions of a dataset can be hierarchically ordered.[^2]

They argue that this allows simpler models, requiring less data and being more interpretable.

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
[^1]: Could KNN be used? I assume so, but maybe it is described further down.
[^2]: So far, it looks more like it involves passing whatever a model can't classify with enough confidence to the next model, and the next, and so on. But hierarchy may be obvious in next sections.
