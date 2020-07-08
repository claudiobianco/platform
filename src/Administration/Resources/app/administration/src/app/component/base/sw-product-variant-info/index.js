import template from './sw-product-variant-info.html.twig';
import './sw-product-variant-info.scss';

const { Component } = Shopware;

/**
 * @private
 * @description Component which renders the variations of variant products.
 * @status ready
 * @example-type code-only
 * @component-example
 * <sw-product-variant-info :variations="variations"></sw-product-variant-info>
 */
Component.register('sw-product-variant-info', {
    template,

    props: {
        variations: {
            type: Array,
            required: false,
            default: null
        },
        highlighted: {
            type: Boolean,
            required: false,
            default: false
        },
        searchTerm: {
            type: String,
            required: false,
            default: ''
        }
    },

    data() {
        return {
            helpText: '',
            tooltipWidth: 200,
            productName: `${this.$slots.default[0].text}`
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.setHelpText();
        },

        setHelpText() {
            this.helpText += this.productName;

            if (this.variations.length > 0) {
                this.tooltipWidth = 500;
                this.helpText += ' (';
                this.variations.forEach((variant) => {
                    this.helpText += `${variant.group} : ${variant.option}`;

                    if (variant !== this.variations[this.variations.length - 1]) {
                        this.helpText += ' | ';
                    }
                });
                this.helpText += ') ';
            }
        }
    }
});
