<!--

@license Apache-2.0

Copyright (c) 2020 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# dsemyc

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Calculate the [standard error of the mean][standard-error] of a double-precision floating-point strided array using a one-pass algorithm proposed by Youngs and Cramer.

<section class="intro">

The [standard error of the mean][standard-error] of a finite size sample of size `n` is given by

<!-- <equation class="equation" label="eq:standard_error_of_the_mean" align="center" raw="\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}" alt="Equation for the standard error of the mean."> -->

```math
\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}
```

<!-- <div class="equation" align="center" data-raw-text="\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}" data-equation="eq:standard_error_of_the_mean">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@e541455edad5251f526b8cc13e60c7d00b4b6767/lib/node_modules/@stdlib/stats/base/dsemyc/docs/img/equation_standard_error_of_the_mean.svg" alt="Equation for the standard error of the mean.">
    <br>
</div> -->

<!-- </equation> -->

where `σ` is the population [standard deviation][standard-deviation].

Often in the analysis of data, the true population [standard deviation][standard-deviation] is not known _a priori_ and must be estimated from a sample drawn from the population distribution. In this scenario, one must use a sample [standard deviation][standard-deviation] to compute an estimate for the [standard error of the mean][standard-error]

<!-- <equation class="equation" label="eq:standard_error_of_the_mean_estimate" align="center" raw="\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}" alt="Equation for estimating the standard error of the mean."> -->

```math
\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}
```

<!-- <div class="equation" align="center" data-raw-text="\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}" data-equation="eq:standard_error_of_the_mean_estimate">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@e541455edad5251f526b8cc13e60c7d00b4b6767/lib/node_modules/@stdlib/stats/base/dsemyc/docs/img/equation_standard_error_of_the_mean_estimate.svg" alt="Equation for estimating the standard error of the mean.">
    <br>
</div> -->

<!-- </equation> -->

where `s` is the sample [standard deviation][standard-deviation].

</section>

<!-- /.intro -->



<section class="usage">

## Usage

```javascript
import dsemyc from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dsemyc@v0.2.2-deno/mod.js';
```

#### dsemyc( N, correction, x, stride )

Computes the [standard error of the mean][standard-error] of a double-precision floating-point strided array `x` using a one-pass algorithm proposed by Youngs and Cramer.

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );
var N = x.length;

var v = dsemyc( N, 1, x, 1 );
// returns ~1.20185
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **correction**: degrees of freedom adjustment. Setting this parameter to a value other than `0` has the effect of adjusting the divisor during the calculation of the [standard deviation][standard-deviation] according to `N-c` where `c` corresponds to the provided degrees of freedom adjustment. When computing the [standard deviation][standard-deviation] of a population, setting this parameter to `0` is the standard choice (i.e., the provided array contains data constituting an entire population). When computing the corrected sample [standard deviation][standard-deviation], setting this parameter to `1` is the standard choice (i.e., the provided array contains data sampled from a larger population; this is commonly referred to as Bessel's correction).
-   **x**: input [`Float64Array`][@stdlib/array/float64].
-   **stride**: index increment for `x`.

The `N` and `stride` parameters determine which elements in `x` are accessed at runtime. For example, to compute the [standard error of the mean][standard-error] of every other element in `x`,

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import floor from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@deno/mod.js';

var x = new Float64Array( [ 1.0, 2.0, 2.0, -7.0, -2.0, 3.0, 4.0, 2.0 ] );
var N = floor( x.length / 2 );

var v = dsemyc( N, 1, x, 2 );
// returns 1.25
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

<!-- eslint-disable stdlib/capitalized-comments -->

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import floor from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@deno/mod.js';

var x0 = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

var N = floor( x0.length / 2 );

var v = dsemyc( N, 1, x1, 2 );
// returns 1.25
```

#### dsemyc.ndarray( N, correction, x, stride, offset )

Computes the [standard error of the mean][standard-error] of a double-precision floating-point strided array using a one-pass algorithm proposed by Youngs and Cramer and alternative indexing semantics.

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );
var N = x.length;

var v = dsemyc.ndarray( N, 1, x, 1, 0 );
// returns ~1.20185
```

The function has the following additional parameters:

-   **offset**: starting index for `x`.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying `buffer`, the `offset` parameter supports indexing semantics based on a starting index. For example, to calculate the [standard error of the mean][standard-error] for every other value in `x` starting from the second value

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import floor from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@deno/mod.js';

var x = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );
var N = floor( x.length / 2 );

var v = dsemyc.ndarray( N, 1, x, 2, 1 );
// returns 1.25
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If `N <= 0`, both functions return `NaN`.
-   If `N - c` is less than or equal to `0` (where `c` corresponds to the provided degrees of freedom adjustment), both functions return `NaN`.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@deno/mod.js';
import round from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-round@deno/mod.js';
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import dsemyc from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dsemyc@v0.2.2-deno/mod.js';

var x;
var i;

x = new Float64Array( 10 );
for ( i = 0; i < x.length; i++ ) {
    x[ i ] = round( (randu()*100.0) - 50.0 );
}
console.log( x );

var v = dsemyc( x.length, 1, x, 1 );
console.log( v );
```

</section>

<!-- /.examples -->

* * *

<section class="references">

## References

-   Youngs, Edward A., and Elliot M. Cramer. 1971. "Some Results Relevant to Choice of Sum and Sum-of-Product Algorithms." _Technometrics_ 13 (3): 657–65. doi:[10.1080/00401706.1971.10488826][@youngs:1971a].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-base/dsem`][@stdlib/stats/base/dsem]</span><span class="delimiter">: </span><span class="description">calculate the standard error of the mean for a double-precision floating-point strided array.</span>
-   <span class="package-name">[`@stdlib/stats-base/dstdevyc`][@stdlib/stats/base/dstdevyc]</span><span class="delimiter">: </span><span class="description">calculate the standard deviation of a double-precision floating-point strided array using a one-pass algorithm proposed by Youngs and Cramer.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-base-dsemyc.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-base-dsemyc

[test-image]: https://github.com/stdlib-js/stats-base-dsemyc/actions/workflows/test.yml/badge.svg?branch=v0.2.2
[test-url]: https://github.com/stdlib-js/stats-base-dsemyc/actions/workflows/test.yml?query=branch:v0.2.2

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-base-dsemyc/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-base-dsemyc?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-base-dsemyc.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-base-dsemyc/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-base-dsemyc/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-base-dsemyc/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-base-dsemyc/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-base-dsemyc/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-base-dsemyc/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-base-dsemyc/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-base-dsemyc/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-base-dsemyc/main/LICENSE

[standard-error]: https://en.wikipedia.org/wiki/Standard_error

[standard-deviation]: https://en.wikipedia.org/wiki/Standard_deviation

[@stdlib/array/float64]: https://github.com/stdlib-js/array-float64/tree/deno

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[@youngs:1971a]: https://doi.org/10.1080/00401706.1971.10488826

<!-- <related-links> -->

[@stdlib/stats/base/dsem]: https://github.com/stdlib-js/stats-base-dsem/tree/deno

[@stdlib/stats/base/dstdevyc]: https://github.com/stdlib-js/stats-base-dstdevyc/tree/deno

<!-- </related-links> -->

</section>

<!-- /.links -->
