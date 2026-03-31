# Explainable AI - Concepts

These are some of my opinions and ideas after reading a few papers:

1. [Explaining Explanations: An Overview of Interpretability of Machine Learning][XX] (2018),
2. [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][XAI4MAT] (2022),
3. [A Perspective on Explainable Artificial Intelligence Methods: SHAP and LIME][using_shap_lime] (2024).
4. [A Unified Approach to Interpreting Model Predictions][SHAP values] (2017).

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

--------------------

## Explanations

For a system, explanations are responses to questions about its "behaviour" or operation.

Scientific models are expected to be explainable; that is, they admit explanations about:

- _how_ they operate,
- _why_ they make certain prediction,
- _what_ the role of certain part of it is, and so on.

We can characterise explanations using:

- __Simplicity__: how easy to understand the explanation is. (The opposite term, _complexity_, could be used as well.)
        - This is correlated with how simple _the model itself_ is.
- __Completeness__: how accurately it describes the model's behaviour.
- __Level__ / __Mereological__: High level or lower level; coarse grained or detailed; selection of parts and functions.
- __Internal__ or __external__

<!-- Not all will be examined, just some, in some depth. -->

<div class="w40 center">
<a href="../assets/tradeoff.png">
<img alt="graph looking like completeness is the inverse of simplitity." src="../assets/tradeoff.png"/>
</a>
<p>Completeness v. Simplicity tradeoff.</p>
</div>

This trade-off isn't universal but just a common case, particularly in deep learning; some other models are straightforward, in which case both characteristics can be high.

## Predictive power

__Predictive power__ is a characteristic of a _model_, not of an _explanation_ of a model. Yet it is correlated to the characteristics given earlier: more predictive models tend to be more complex making harder to explain them.

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

<!-- ## Complex Systems View -->
<!---->
<!-- Think of complex objects such as: -->
<!---->
<!-- - a car, -->
<!-- - a computer -->
<!-- - the atmosphere, -->
<!-- - a unicellular organism, -->
<!-- - a brain, -->
<!-- - a mammal -->
<!---->
<!-- There are many ways in which we study these things. They roughly correspond to scale and mereology, of parts and functions. We have associated techniques for to measuring and testing them at each level. -->
<!-- Some levels map to disciplines like physical, chemical, biological, neurobiological; some are more informational some are emergent; some use analogies of metaphors. We also study them as entire systems, observing their external behaviour, interactions and response to stimuli. -->
<!---->
<!-- Now, play with the idea of studying a deep learning model in a variety of such ways. Can we extract any insight from analogies to those above? -->
<!---->
<!-- To make it a bit more concrete, let's say we have: -->
<!---->
<!-- 1. Intrinsic / Mereological Levels (neurons, layers,...) -->
<!--     - The connection between parts and levels -->
<!--     - Informational aspects, mathematical aspects -->
<!--     - Parts and functions -->
<!--     - How? Is there emergent behaviour? -->
<!--     - Lower level, Higher level -->
<!-- 2. Extrinsic / The system as a totality and its environment -->
<!--     - Testing, -->
<!--     - Fitting simpler models -->
<!---->
<!-- Besides we can think of questions. The questions XAI asks are: How does it make this or that decision? Which inputs were most important? Which questions do we ask elsewhere about such complex systems? How do you trust your dog, or your partner, or another human? -->
<!---->
<!-- However, there may be a critical difference which is DL systems may be used to make decisions in our behalf. But in this case, we can still push the analogy to another human making a decision. What would be require of the human? -->
<!---->
<!-- Where does this analogy hold, where does it break? One currently missing characteristic is for models to be __accountable__, and to be able to learn on the fly, when shown to be wrong. -->
<!---->
<!-- What is quite obvious from the start, is that we do not have access to the lower level model, such as the neurons or the processes within a cell (for a single celled organism). -->
<!---->
<!-- What we have are higher level theories of how they work, and we test them to that extent. A similar thing with other humans. -->
<!---->
<!-- In a way, we are then looking for higher-level theories that makes us trust the model. -->

[XAI4MAT]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[XX]: http://arxiv.org/abs/1806.00069
[SHAP values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
