# Explainable AI - Concepts

There are many definitions of what explanations are in the context of explainable AI, such as:

> Explanations are _answers to questions about the model's predictions or operation_.
>
> _How_ does it operate? _Why_ does it makes certain prediction? _What_ is the role of certain neuron or layer?

In contrast to explainable models, black-box models share no insight about their operation or predictions.

The questions and the answers depend on the _audience_, the _context_ and so forth; [for example][radiology]:

> (...) there are two competing broad definitions of interpretability. Machine learning specialists seek to understand the mechanisms underlying their models, but doctors and other end-users simply want "human-style" explanations; the same sort of explanations they currently receive from other humans.

They further say:

> description is often post-hoc and may not accurately reflect the decision making process, it is the form of explanation that end-users currently expect and are satisfied with.

Doctors preferred an RNN's **text outputs** &mdash;besides the saliency map&mdash; for any decision. The output was then evaluated by a clinician. Similarly, in synthetic chemistry, new candidates are vetted by expert chemists. Again, text can be a useful piece of information for the expert to work on, consider, evaluate. However, with no "human in the loop", this approach isn't enough.

There are many dimensions to explanations, besides the _audience_:

- Contexts: In areas of science, healthcare, finance, energy, weapons, and in general in large parts of automated decision-making. Critical due to transparency or ethical reasons.
    - Yet in other scenarios, explainability may not matter &mdash;but only the model's output, which a human expert could evaluate.
- Audiences: scientists, ML practitioners, developers, non-expertsand so forth.
- Stages: pre-modelling, modelling, post-modelling.

## Characteristics

We can consider characteristics of explanations independent of the audience and context:

- __Simplicity__: how easy to understand the explanation is. (The opposite term, _complexity_, could be used as well.)
    - This is correlated with how simple _the model itself_ is.
- __Completeness__: how accurately it describes the model's behaviour.
- __Level__ / __Mereological__: High level or lower level; coarse grained or detailed; selection of parts and functions.
- __Internal__ or __external__

<div class="w40 center">
<a href="../assets/tradeoff.png">
<img alt="graph looking like completeness is the inverse of simplitity." src="../assets/tradeoff.png"/>
</a>
<p>Completeness v. Simplicity tradeoff.</p>
</div>

This trade-off isn't universal but just a common case, particularly in deep learning; some other models are straightforward, in which case both characteristics can be high.

## Predictive power

__Predictive power__ is a characteristic of a _model_, not of an _explanation_ of a model. Yet, it is correlated to the characteristics given earlier: more predictive models tend to be more complex making harder to explain them.

The reason to include it here is that _predictive power_ plays an important role deciding which model to use.

In the image below, note that _understandability_ replaces _simplicity_, and _correctness_ replaces _predictive power_.

<div class="center w40"> <!--other classes: w220, w420-->
    <a href="../assets/radar_plot.png">
    <img src="../assets/radar_plot.png" alt="Plot of the three dimensions"/>
    </a>
    <p>
    Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

Let's now look at some actual methods.

--------------------

Sources:

1. [A Unified Approach to Interpreting Model Predictions][SHAP values] (2017),
2. [Explaining Explanations: An Overview of Interpretability of Machine Learning][XX] (2018),
3. [Producing radiologist-quality reports for interpretable artificial intelligence][radiology] (2018),
4. [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][XAI4MAT] (2022),
5. Blog Posts: [What is Explainable AI?][What is XAI] (2022) and from [IBM][XAI IBM],
6. [A Perspective on Explainable Artificial Intelligence Methods: SHAP and LIME][using_shap_lime] (2024).

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->


[XAI4MAT]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[XX]: http://arxiv.org/abs/1806.00069
[SHAP values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
<!-- [XAI for whom]: http://arxiv.org/abs/2106.05568 -->
[What is XAI]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[XAI IBM]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[radiology]: https://arxiv.org/abs/1806.00340
