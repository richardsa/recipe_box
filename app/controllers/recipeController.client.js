'use strict';

(function() {


   
 $(document).ready(function() {
      var quantityValidators = {
          row: '.col-xs-2', // The quantity is placed inside a <div class="col-xs-4"> element
          validators: {
            notEmpty: {
              message: 'The quantity is required'
            },
            numeric: {
              message: 'The ingredient must be a numeric number'
            }
          }
        },
        metricValidators = {
          row: '.col-xs-4',
          validators: {
            notEmpty: {
              message: 'The metric is required'
            }
          }
        },
        ingredientValidators = {
          row: '.col-xs-2',
          validators: {
            notEmpty: {
              message: 'The ingredient is required'
            }
          }
        },
        ingredientIndex = 0;

      $('#uploadForm')
        .formValidation({
          framework: 'bootstrap',
          icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            'ingredient[0].quantity': quantityValidators,
            'ingredient[0].metric': metricValidators,
            'ingredient[0].ingredient': ingredientValidators
          }
        })

      // Add button click handler
      .on('click', '.addButton', function() {
        ingredientIndex++;
        var $template = $('#ingredientTemplate'),
          $clone = $template
          .clone()
          .removeClass('hide')
          .removeAttr('id')
          .attr('data-ingredient-index', ingredientIndex)
          .insertBefore($template);

        // Update the name attributes
        $clone
          .find('[name="quantity"]').attr('name', 'ingredient[' + ingredientIndex + '].quantity').end()
          .find('[name="metric"]').attr('name', 'ingredient[' + ingredientIndex + '].metric').end()
          .find('[name="ingredient"]').attr('name', 'ingredient[' + ingredientIndex + '].ingredient').end();

        // Add new fields
        // Note that we also pass the validator rules for new field as the third parameter
        $('#uploadForm')
          .formValidation('addField', 'ingredient[' + ingredientIndex + '].quantity', quantityValidators)
          .formValidation('addField', 'ingredient[' + ingredientIndex + '].metric', metricValidators)
          .formValidation('addField', 'ingredient[' + ingredientIndex + '].ingredient', ingredientValidators);
      })

      // Remove button click handler
      .on('click', '.removeButton', function() {
        var $row = $(this).parents('.form-group'),
          index = $row.attr('data-ingredient-index');

        // Remove fields
        $('#uploadForm')
          .formValidation('removeField', $row.find('[name="ingredient[' + index + '].quantity"]'))
          .formValidation('removeField', $row.find('[name="ingredient[' + index + '].metric"]'))
          .formValidation('removeField', $row.find('[name="ingredient[' + index + '].ingredient"]'));

        // Remove element containing the fields
        $row.remove();
      });
    });
  
})();