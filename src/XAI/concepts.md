# Explainable AI - Concepts

There are many definitions of what explanations are in the context of explainable AI, such as:

> Explainable AI aims to _describe a model's predictions or operation_.
>
> _How_ does it operate? _Why_ does it makes certain prediction? _What_ is the role of certain neuron or layer?

In contrast to explainable models, black-box or opaque models hardly explainable.

## Multiple Dimensions

One paper on [XAI for radiology][xai_rnn_radiology] found that doctors preferred __text outputs__ + __saliency maps__ to aid their decisions (in a sense, emulating doctor-to-doctor communication). The output was then evaluated by a clinician.

Similarly, in synthetic chemistry, new candidates are vetted by expert chemists. Again, text can be a useful piece of information for the expert to work on, consider, evaluate. However, with no "human in the loop", this approach isn't enough.

Relevant dimensions for explaining AI are both social and technical, and these are intertwined. Public organisations use AI in automated decision-making, to increase efficiency and effectiveness. But, as stated in [The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making][perils_and_pitfalls]:

> But also other public values like accountability, transparency, equality, privacy and security, sustainability, and interoperability should be given attention when designing AI for public use

They also recall an explanation "accuracy vs simplicity" trade-off:

> Belle and Papantonis (2021) (...) also discuss the complexity of realizing such suggestions. Simplifications might not be correct, features can be interrelated, local explanations can fail to provide the complete picture, and graphical visualization requires assumptions about data that might not necessarily be true.

### Disentangling Dimensions

We can focus on _some_ aspects of explanations (not of the model):

- __Simplicity__: how easy to understand the explanation is.
    - How much expertise does a human needed to understand it?
    - This is also correlated with how simple _the model itself_ is.
- __Accuracy__: how accurately it describes the model's behaviour.
    - Does it lead to wild surprises, or obvious contradictions?
- __Level__ / __Mereological__: High-level or lower-level? Instance or general? Global or local? Coarse grained or detailed? Internal/Intrinsic or External/Extrinsic?

<div class="w40 center">
<a href="../assets/tradeoff.png">
<img alt="graph looking like completeness is the inverse of simplitity." src="../assets/tradeoff.png"/>
</a>
<p>Explanation Accuracy v. Explanation Simplicity tradeoff.</p>
</div>

This trade-off isn't universal but just a common case, particularly in deep learning; some other models are straightforward, in which case both characteristics can be high.

### Predictive power

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

## Explanation Strategies

[The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making][perils_and_pitfalls] recalls a few also from Belle and Papantonis:

- By simplification,
- Feature contributions to output/prediction/decision,
- Explaining instance instead of general,
- Graphical Visualisation.

Let's now look at some actual methods.

--------------------

Sources:

1. [A Unified Approach to Interpreting Model Predictions][shap_values] (2017),
2. [Explaining Explanations: An Overview of Interpretability of Machine Learning][xx] (2018),
3. [Producing radiologist-quality reports for interpretable artificial intelligence][radiology] (2018),
4. [The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making][perils_and_pitfalls] (2021) this paper is a particularly short and amenable introduction;
5. [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][xai4mat] (2022),
6. Blog Posts: [What is Explainable AI?][what_is_xai] (2022) and from [IBM][xai_ibm],
7. [A Perspective on Explainable Artificial Intelligence Methods: SHAP and LIME][using_shap_lime] (2024).

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

[xai4mat]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[xx]: http://arxiv.org/abs/1806.00069
[shap_values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
<!-- [XAI for whom]: http://arxiv.org/abs/2106.05568 -->
[what_is_xai]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai_ibm]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai_rnn_radiology]: https://arxiv.org/abs/1806.00340
[perils_and_pitfalls]: https://www.sciencedirect.com/science/article/pii/S0740624X21001027
