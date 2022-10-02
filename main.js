
$( document ).ready( function() {

    // if there was a session before, resore it
    if (localStorage.getItem('saved_data')) {

        var notes = localStorage.getItem('saved_data');
        $('.parent-container').empty();
        $('.parent-container').append(notes);
    }
    var taken_notes = $('.parent-container').html();

    var input_element_new_note = `
    
        <div class="note-area">

            <div class="note-elements">
                
                <textarea name="input-form" rows="4" cols="50">Enter the note</textarea>
                
                <div class="control-section">
                    <button class="button-save">Save ✅</button>
                    <button class="button-delete">Delete Note ❌</button>
                </div>
            </div>

        </div>
        
    `;

    var input_element_edit_note = `
        <div class="note-elements">

            <textarea name="input-form" rows="4" cols="50">Enter the note</textarea>
            
            <div class='control-section'>
                <button class="button-save">Save ✅</button>
                <button class="button-delete">Delete Note ❌</button>
            </div>

        </div>
    `;

    var delete_button = `<button class="button-delete-all">Delete All Notes ❌</button>`;

    var edit_button = `<button class="button-edit">Edit 📝</button>`;

    // * *
    // add the note field with controls  
    // * *

    $('.button-add').click(function() {
        
        // adding input field with unique id
        $('.all-notes').append(input_element_new_note);

        // reverse inner html of the button
        $('.button-add').html('Add another note ✏️')

        // if no delete all button, create one
        if (!$('.button-delete-all').length) {
            $('.main-buttons').append(delete_button);
        }
      });

    // * *
    // delete all the records from the page 
    // * *

    $(document).on('click', '.button-delete-all', function() {
        // if exists, remove all notes
        if ( $('.note-area') ) {
            $('.note-area').remove();
            $('.button-delete-all').remove();
        // since all records are cleared, reverse to the original button
            $('.button-add').html("Add note ✏️");

        }
    });

    // * *
    // delete specific record from the page 
    // * *

    $(document).on('click', '.button-delete', function() {
        $(this).closest('.note-area').remove();
        if (!$('.note-area').length) {
            $('.button-delete-all').remove();
            $('.button-add').html('Add note ✏️');
        }

        //snapshotting the notes
        var taken_notes = $('.parent-container').html();
        localStorage.setItem('saved_data', taken_notes);
    });

    // * *
    // saving the record  
    // * *

    $(document).on('click', '.button-save', function() {
        // getting the time smap
        var d = new Date();
        var time_stamp = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + "@" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // getting the data from the input field
        text_data = $(this).closest('.note-area').find('textarea').val();
        insert_data = `
            <div class="note">
                <p class="time-stamp">Note taken: ${time_stamp}</p> 
                <p class="note-data">${text_data}</p>
                ${edit_button}
            </div>
            `;
        // appending the note, removing the controls
        $(this).closest('.note-area').append(insert_data);
        $(this).closest('.note-elements').remove();

        //snapshotting the notes
        var taken_notes = $('.parent-container').html();
        localStorage.setItem('saved_data', taken_notes);

    });

    // * *
    // editing the note 
    // * *

    $(document).on('click', '.button-edit', function() {
        var current_data = $('.note-data').html();
        $(this).closest('.note-area').append(input_element_edit_note);
        $('textarea').val(current_data);
        $(this).closest('.note').remove();
    });

});
    




