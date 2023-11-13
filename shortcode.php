<?php
// Function to display custom post type category based posts
function quality_custom_post_type_category_posts_shortcode($atts)
{
    $terms = get_terms('salon_type');
    printf('<div class="salon-cate-wrapper"> <div class="filter-nonce" data-nonce="%s"></div>', wp_create_nonce('filter_nonce'));

    // Check if terms were retrieved
    if ($terms && !is_wp_error($terms)) {
        printf('<div class="salon-type salon-cats"><h3>Locations:</h3>');
        foreach ($terms as $term) {
            printf('<span data-slug="%s">%s</span>', $term->slug, esc_html($term->name));
        }
        printf('</div>');
    } else {
        printf('No terms found.');
    }

    $terms_art = get_terms('artist_tag');

    // Check if terms were retrieved
    if ($terms_art && !is_wp_error($terms_art)) {
        printf('<div class="salon-type salon-tags"><h3>Tags:</h3>');
        foreach ($terms_art as $term) {
            printf('<span data-slug="%s">%s</span>', $term->slug, esc_html($term->name));
        }
        printf('</div>');
    } else {
        printf('No terms found.');
    }

    printf('</div><div class="salon-post-load" id="load-salon-posts"><img id="preloader" src="%s" /></div>', get_theme_file_uri('/assets/images/ajax-loader.gif'));
}

// Register shortcode
add_shortcode('quality_custom_post_type_category_posts', 'quality_custom_post_type_category_posts_shortcode');

