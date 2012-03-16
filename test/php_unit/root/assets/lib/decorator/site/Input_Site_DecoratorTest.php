<?php

/**
 * Test class for Input_Site_Decorator.
 * 
 * @author trott
 * @copyright Copyright (c) 2012 UC Regents
 * @license http://mwf.ucla.edu/license
 * @version 20120315
 *
 * @uses PHPUnit_Framework_TestCase
 * @uses Input_Site_Decorator
 */
require dirname(dirname(dirname(dirname(dirname(dirname(dirname(__DIR__))))))) . '/root/assets/lib/decorator/site/input.class.php';

/**
 * Test class for Input_Site_Decorator.
 * Generated by PHPUnit on 2012-03-15 at 22:34:55.
 */
class Input_Site_DecoratorTest extends PHPUnit_Framework_TestCase {

    //@todo: remove this after fixing Config object
    public function setUp() {
        $_SERVER['HTTP_HOST'] = 'http://www.example.com';
        $this->object = new Input_Site_Decorator('input_id', 'input_label');
    }

    protected $object;

    /**
     * @test
     */
    public function isMandatory_mandatory_true() {
        $this->object->mandatory();
        $this->assertSame(true, $this->object->is_mandatory());
    }

    /**
     * @test
     */
    public function isMandatory_notMandatory_false() {
        $this->assertSame(false, $this->object->is_mandatory());
    }

    /**
     * @test
     */
    public function setPlacedholder_placeholderText_placedholderRendered() {
        $this->object->set_placeholder('Input placeholder text');
        $this->assertContains('Input placeholder text', $this->object->render());
    }

    /**
     * @test
     */
    public function mandatory_void_requireRendered() {
        $this->object->mandatory();
        $this->assertContains('required="required"', $this->object->render());
    }

    /**
     * @test
     */
    public function invalid_void_invalidRenderedButNoParagraph() {
        $this->object->invalid();
        $rendered = $this->object->render();
        $this->assertContains('class="invalid"', $rendered);
        $this->assertNotContains('<p class="invalid">', $rendered);
    }

    /**
     * @test
     */
    public function invalid_message_invalidRenderedWithParagraph() {
        $this->object->invalid('Input invalid!');
        $rendered = $this->object->render();
        $this->assertRegExp('/class="invalid">.*<p class="invalid"/', $rendered);
        $this->assertContains('<p class="invalid">Input invalid!</p>', $rendered);
    }

    /**
     * @test
     */
    public function disable_void_disabledRendered() {
        $this->object->disable();
        $this->assertContains('disabled="disabled"', $this->object->render());
    }

    /**
     * @test
     */
    public function typeColor_void_colorRendered() {
        $this->object->type_color();
        $this->assertContains('class="color-field"', $this->object->render());
    }

    /**
     * @test
     */
    public function typeSearch_void_searchRendered() {
        $this->object->type_search();
        $this->assertContains('class="search-field"', $this->object->render());
    }

    /**
     * @test
     */
    public function typeTelephone_void_telephoneRendered() {
        $this->object->type_telephone();
        $this->assertContains('class="tel-field"', $this->object->render());
    }

    /**
     * @test
     */
    public function typeUrl_void_urlRendered() {
        $this->object->type_url();
        $this->assertContains('class="url-field"', $this->object->render());
    }

    /**
     * @test
     */
    public function typeEmail_void_emailRendered() {
        $this->object->type_email();
        $this->assertContains('class="email-field"', $this->object->render());
    }


    /**
     * @test
     */
    public function render_void_inputRendered() {
        $rendered = $this->object->render();
        $this->assertRegExp('/<input.*id="input_id".*>/', $rendered);
        $this->assertRegExp('/<input.*name="input_id".*>/', $rendered);
    }
}
