<?php
/**
 * CLT India Custom Gutenberg Blocks Registration
 *
 * @package CLT_India_Redesign
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Register Custom Blocks for CLT India.
 */
function clt_register_custom_gutenberg_blocks() {
    
    // Register Interactive Map block definition
    register_block_type( 'clt-blocks/interactive-map', array(
        'api_version' => 2,
        'title'       => __( 'CLT Interactive India Map', 'clt-india' ),
        'category'    => 'widgets',
        'icon'        => 'location-alt',
        'description' => __( 'Display CLT active execution states on India map with interactive hover indicators.', 'clt-india' ),
        'attributes'  => array(
            'activeStates' => array(
                'type'    => 'array',
                'default' => array( 'KA', 'MH', 'TN', 'AP', 'TG', 'MP', 'RJ', 'UP' ),
            ),
        ),
        'render_callback' => 'clt_render_map_block_callback',
    ) );
    
    // Register Dynamic Impact Counter block definition
    register_block_type( 'clt-blocks/impact-counter', array(
        'api_version' => 2,
        'title'       => __( 'CLT Impact Counter', 'clt-india' ),
        'category'    => 'widgets',
        'icon'        => 'performance',
        'description' => __( 'Display animated numeric counters showing students reached or teachers active.', 'clt-india' ),
        'attributes'  => array(
            'targetNumber' => array(
                'type'    => 'string',
                'default' => '1000',
            ),
            'label'        => array(
                'type'    => 'string',
                'default' => 'Schools Reached',
            ),
            'suffix'       => array(
                'type'    => 'string',
                'default' => '+',
            ),
        ),
        'render_callback' => 'clt_render_counter_block_callback',
    ) );
}
add_action( 'init', 'clt_register_custom_gutenberg_blocks' );

/**
 * Render Callback for Interactive Map block.
 */
function clt_render_map_block_callback( $attributes ) {
    ob_start();
    ?>
    <div class="wp-block-clt-interactive-map map-section">
        <div class="map-layout">
            <div class="map-container">
                <svg class="india-svg-map" viewBox="0 0 600 650" xmlns="http://www.w3.org/2000/svg">
                    <g id="india-states-group">
                        <path class="india-state active-state" data-state-code="KA" d="M 180 450 C 185 460, 195 480, 200 520 C 190 530, 185 540, 180 550 C 170 540, 160 520, 165 480 Z" />
                        <path class="india-state active-state" data-state-code="MH" d="M 160 380 C 180 370, 230 380, 240 400 C 230 430, 190 440, 180 450 C 170 420, 150 400, 160 380 Z" />
                        <path class="india-state active-state" data-state-code="TN" d="M 205 535 C 220 540, 230 560, 225 600 C 215 605, 205 580, 200 565 C 200 550, 205 540, 205 535 Z" />
                        <path class="india-state active-state" data-state-code="AP" d="M 200 475 C 210 470, 235 480, 240 500 C 235 520, 220 535, 205 535 C 200 520, 195 490, 200 475 Z" />
                        <path class="india-state active-state" data-state-code="TG" d="M 205 450 C 215 445, 235 455, 230 475 C 220 480, 210 475, 200 475 Z" />
                        <path class="india-state active-state" data-state-code="MP" d="M 180 290 C 220 280, 260 290, 270 320 C 250 350, 210 360, 180 350 C 170 330, 175 300, 180 290 Z" />
                        <path class="india-state active-state" data-state-code="RJ" d="M 120 220 C 150 200, 180 220, 180 250 C 170 280, 140 290, 120 270 Z" />
                        <path class="india-state active-state" data-state-code="UP" d="M 200 210 C 240 190, 280 210, 290 240 C 270 270, 220 280, 200 260 Z" />
                        <path d="M 150 100 L 180 150 L 120 220 M 180 250 L 200 210 L 290 200 M 270 320 L 300 350" fill="none" stroke="#CBD5E0" stroke-width="1.5" stroke-dasharray="4" />
                    </g>
                    <circle cx="180" cy="490" r="10" fill="var(--primary-color)" />
                    <circle cx="200" cy="410" r="10" fill="var(--primary-color)" />
                    <circle cx="215" cy="565" r="10" fill="var(--primary-color)" />
                    <circle cx="220" cy="505" r="10" fill="var(--primary-color)" />
                    <circle cx="215" cy="460" r="10" fill="var(--primary-color)" />
                    <circle cx="225" cy="320" r="10" fill="var(--primary-color)" />
                    <circle cx="150" cy="245" r="10" fill="var(--primary-color)" />
                    <circle cx="245" cy="235" r="10" fill="var(--primary-color)" />
                </svg>
            </div>
            
            <div class="map-info-panel">
                <div class="glass-card state-detail-card">
                    <h3 id="selected-state-name" style="color: var(--primary-color);">Karnataka</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">Hover/Click map points to check implementation footprint details.</p>
                    <div class="state-stats-row"><span>Government Schools Reached</span><span id="state-schools">2,450+</span></div>
                    <div class="state-stats-row"><span>Teachers Active</span><span id="state-teachers">14,200+</span></div>
                    <div class="state-stats-row"><span>Students Impacted</span><span id="state-students">1.1M+</span></div>
                    <div class="state-stats-row"><span>e-Learning Labs Configured</span><span id="state-labs">2,100+</span></div>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render Callback for Dynamic Impact Counter block.
 */
function clt_render_counter_block_callback( $attributes ) {
    $target = esc_attr( $attributes['targetNumber'] );
    $label  = esc_html( $attributes['label'] );
    $suffix = esc_attr( $attributes['suffix'] );
    
    ob_start();
    ?>
    <div class="wp-block-clt-impact-counter counter-item">
        <div class="counter-number" data-target="<?php echo $target; ?>" data-suffix="<?php echo $suffix; ?>">0</div>
        <div class="counter-title"><?php echo $label; ?></div>
    </div>
    <?php
    return ob_get_clean();
}
