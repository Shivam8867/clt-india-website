<?php
/**
 * CLT India Custom Theme Functions and Definitions
 *
 * @package CLT_India_Redesign
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Setup theme defaults and register support for WordPress features.
 */
function clt_india_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    // Enable custom title tags dynamically managed by WordPress.
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails (Featured Images) on posts and pages.
    add_theme_support( 'post-thumbnails' );

    // Register navigation menus.
    register_nav_menus( array(
        'primary-menu' => esc_html__( 'Primary Header Menu', 'clt-india' ),
        'footer-menu'  => esc_html__( 'Footer Quick Links Menu', 'clt-india' ),
    ) );

    // Switch default core markup for search form, comment form, comments, gallery to output valid HTML5.
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Enable wide alignment support for Gutenberg block patterns.
    add_theme_support( 'align-wide' );

    // Add support for responsive embedded video.
    add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'clt_india_theme_setup' );

/**
 * Enqueue scripts and styles representing our design system.
 */
function clt_india_enqueue_scripts() {
    // Load Inter & Manrope google fonts
    wp_enqueue_style( 'clt-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap', array(), null );

    // Load main compiled stylesheet
    wp_enqueue_style( 'clt-global-style', get_template_directory_uri() . '/style.css', array(), '1.0.0' );

    // Load main interactive and animation logic scripts
    wp_enqueue_script( 'clt-global-js', get_template_directory_uri() . '/main.js', array(), '1.0.0', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'clt_india_enqueue_scripts' );

/**
 * Filter body class lists to inject custom tags.
 */
function clt_body_classes( $classes ) {
    // Inject custom premium tag attributes for theme overrides
    $classes[] = 'clt-premium-design';
    return $classes;
}
add_filter( 'body_class', 'clt_body_classes' );

/**
 * Inject JSON-LD Schema markup in the head tag.
 */
function clt_inject_seo_schema() {
    if ( is_front_page() ) {
        $schema_file = get_template_directory() . '/wordpress/seo-schema.json';
        if ( file_exists( $schema_file ) ) {
            $schema_data = file_get_contents( $schema_file );
            echo '<script type="application/ld+json">' . $schema_data . '</script>';
        }
    }
}
add_action( 'wp_head', 'clt_inject_seo_schema' );
