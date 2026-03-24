# EHME&mdash;Part II

Here are some further thoughts on the paper

## Comments

- Could KNN be used to decide Hypothesis B? I think it is possible.
    - Option 1: if we run KNN for each cluster, we need to think how to select one cluster over another.
    - Option 2: if each point is labelled class-cluster, the problem seems solvable. The winner would be the cluster with largest class votes.
- <q>However, they are not suitable for incorporating a Euclidean distance model.</q> Can't DL use this?
- How are the datasets split, and which role does Monte Carlo Ensemble play?
- Even though the pieces are simple, explainability in the sense of _how and why_ the model proposes a candidate is not achieved.
- In my view the paper's use of the term _hyperspace_ is inaccurate; hyperspace is $\mathbb{R}^{N > 3}$. What they have seem _subsets of hyperspace_ given by the probability condition above.
- It's not described here (but elsewhere) _how_ the hierarchy of models is produced; that is which one is executed after which. However, it seems to involve an ensemble of models trained together to run sequentially (hierarchically if the sequence is imagined vertically?).
- The paper does not describe exactly how the dataset is split, nor is detailed enough about the training.

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.

Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.

Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

## Terminology breakdown

The title of the paper is _Domain Independent XAI for Material Science_. This is confusing: is it domain-independent or for the domain of
 materials science?

**Domain Independent** is to be interpreted as using _composition vectors_ which are domain independent _within_ materials science.

We also need to hold in our heads the mouthful _Explainable Hierarchical Monte Carlo Ensemble_ (EHME), which could have been the title of the paper.

These terms can be clarified further:

- **Explainable**: Composition vectors are intuitive, and so is euclidean distance which is the base of their classification models.
- **Hierarchical**: Passing on what isn't classified to other classifiers up the hierarchy.
- **Monte Carlo Ensemble**: Multiple Monte Carlo models. It's unclear how is this used, but it is coupled with the euclidean distance model.
