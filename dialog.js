'use strict';

/*
 * Dialog
 */
class Dialog {
	constructor( text ) {
		this.dialog = document.createElement( 'dialog' );

		const form  = document.createElement( 'form' );
		form.method = 'dialog';

		this.content = document.createElement( 'div' );
		this.content.classList.add( 'content' );
		this.content.addEventListener( 'click', this.selectText.bind( this ) );

		const cancelBtn = document.createElement( 'button' );
		cancelBtn.value = 'cancel';
		cancelBtn.append( '×' );
		cancelBtn.addEventListener( 'click', event => {
			this.cancel();
		} );

		form.append( cancelBtn, this.content );
		this.dialog.append( form );
		document.body.append( this.dialog );

		this.dialog.addEventListener( 'click', event => {
			if ( event.target === this.dialog ) {
				this.cancel();
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

	cancel() {
		const cancelEvent = new Event( 'cancel' );
		this.dialog.dispatchEvent( cancelEvent );
		this.close();
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

