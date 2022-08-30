import { gql } from '@apollo/client';

export const CategoryFragment = gql`
    # eslint-disable-next-line @graphql-eslint/require-id-when-available
    fragment CategoryFragment on CategoryTree {
        uid
        meta_title
        meta_keywords
        meta_description
    }
`;

export const ProductsFragment = gql`
    fragment ProductsFragment on Products {
        items {
            id
            uid
            name
            brand
            product_brand
            price {
                regularPrice {
                    amount {
                        currency
                        value
                    }
                }
            }
            media_gallery_entries {
                uid
                label
                position
                disabled
                file
            }
            price_range {
                maximum_price {
                    final_price {
                        currency
                        value
                    }
                    regular_price {
                        currency
                        value
                    }
                    discount {
                        amount_off
                    }
                }
            }
            sku
            small_image {
                url
            }
            stock_status
            rating_summary
            __typename
            url_key
            ... on ConfigurableProduct {
                # eslint-disable-next-line @graphql-eslint/require-id-when-available
                configurable_options {
                    attribute_code
                    attribute_id
                    uid
                    label
                    # eslint-disable-next-line @graphql-eslint/require-id-when-available
                    values {
                        uid
                        default_label
                        label
                        store_label
                        use_default_value
                        value_index
                        swatch_data {
                            ... on ImageSwatchData {
                                thumbnail
                            }
                            value
                        }
                    }
                }
                variants {
                    attributes {
                        code
                        value_index
                    }
                    # eslint-disable-next-line @graphql-eslint/require-id-when-available
                    product {
                        uid
                        # eslint-disable-next-line @graphql-eslint/require-id-when-available
                        media_gallery_entries {
                            uid
                            disabled
                            file
                            label
                            position
                        }
                        sku
                        stock_status
                        price {
                            regularPrice {
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                        price_range {
                            maximum_price {
                                final_price {
                                    currency
                                    value
                                }
                                discount {
                                    amount_off
                                }
                            }
                        }
                        custom_attributes {
                            selected_attribute_options {
                                attribute_option {
                                    uid
                                    label
                                    is_default
                                }
                            }
                            entered_attribute_value {
                                value
                            }
                            attribute_metadata {
                                uid
                                code
                                label
                                attribute_labels {
                                    store_code
                                    label
                                }
                                data_type
                                is_system
                                entity_type
                                ui_input {
                                    ui_input_type
                                    is_html_allowed
                                }
                                ... on ProductAttributeMetadata {
                                    used_in_components
                                }
                            }
                        }
                    }
                }
            }
        }
        page_info {
            total_pages
        }
        total_count
    }
`;
