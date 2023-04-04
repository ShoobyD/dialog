'use strict';

/*
 * Dialog
 */
class Dialog {
	constructor( text ) {
		this.dialog = document.createElement( 'dialog' );

		this.form        = document.createElement( 'form' );
		this.form.method = 'dialog';

		this.content = document.createElement( 'div' );
		this.content.classList.add( 'content' );
		this.content.addEventListener( 'click', this.selectText.bind( this ) );

		this.cancelBtn       = document.createElement( 'button' );
		this.cancelBtn.value = 'cancel';
		this.cancelBtn.append( '×' );

		this.form.append( this.cancelBtn, this.content );
		this.dialog.append( this.form );
		document.body.append( this.dialog );

		this.dialog.addEventListener( 'click', event => {
			if ( event.target === this.dialog ) {
				this.close();
			}
		} );

		if ( text ) {
			this.showModal( text );
		}
	}

	show( msg ) {
		this.setText( text );
		this.dialog.show();
	}

	showModal( text ) {
		this.setText( text );
		this.dialog.showModal();
	}

	close() {
		this.dialog.close();
	}

	setText( text ) {
		if ( text ) {
			if ( Array.isArray( text ) ) {
				text = text.join( '\n' );
			}
			this.content.innerHTML = text;
		}
	}

	selectText() {
		getSelection().selectAllChildren( this.content );
	}
}

