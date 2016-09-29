'use strict';

(function() {

$(document).ready(function() {
   
  var titleValidators = {
            row: '.col-xs-4',   // The title is placed inside a <div class="col-xs-4"> element
            validators: {
                notEmpty: {
                    message: 'The title is required'
                }
            }
        },
        isbnValidators = {
            row: '.col-xs-4',
            validators: {
                notEmpty: {
                    message: 'The ISBN is required'
                },
                isbn: {
                    message: 'The ISBN is not valid'
                }
            }
        },
        priceValidators = {
            row: '.col-xs-2',
            validators: {
                notEmpty: {
                    message: 'The price is required'
                },
                numeric: {
                    message: 'The price must be a numeric number'
                }
            }
        },
        bookIndex = 0;

    $('#uploadForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'book[0].title': titleValidators,
                'book[0].isbn': isbnValidators,
                'book[0].price': priceValidators
            }
        })

      // Add button click handler
      .on('click', '.addButton', function() {
          bookIndex++;
          var $template = $('#bookTemplate'),
              $clone    = $template
                              .clone()
                              .removeClass('hide')
                              .removeAttr('id')
                              .attr('data-book-index', bookIndex)
                              .insertBefore($template);

          // Update the name attributes
          $clone
              .find('[name="title"]').attr('name', 'book[' + bookIndex + '].title').end()
              .find('[name="isbn"]').attr('name', 'book[' + bookIndex + '].isbn').end()
              .find('[name="price"]').attr('name', 'book[' + bookIndex + '].price').end();
    
      })
      
        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-book-index');

            // Remove fields
            $('#uploadForm')
                .formValidation('removeField', $row.find('[name="book[' + index + '].title"]'))
                .formValidation('removeField', $row.find('[name="book[' + index + '].isbn"]'))
                .formValidation('removeField', $row.find('[name="book[' + index + '].price"]'));

            // Remove element containing the fields
            $row.remove();
        });
});
  
})();