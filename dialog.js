'use strict';

/*
 * Dialog
 */
class Dialog {
	constructor( text ) {

		const dialog = document.createElement( 'dialog' );

		const form  = document.createElement( 'form' );
		form.method = 'dialog';

		this.content = document.createElement( 'div' );
		this.content.classList.add( 'content' );

		const cancelBtn = document.createElement( 'button' );
		cancelBtn.value = 'cancel';
		cancelBtn.append( '×' );
		cancelBtn.addEventListener( 'click', event => {
			this.cancel();
		} );

		form.append( cancelBtn, this.content );
		dialog.append( form );
		document.body.append( dialog );

		dialog.addEventListener( 'click', event => {
			if ( event.target === dialog ) {
				dialog.cancel();
			} else {
				dialog.selectText();
			}
		} );

		if ( text ) {
			this.showModal( text );
		}

		Object.setPrototypeOf( Dialog.prototype, HTMLDialogElement.prototype );
		Object.setPrototypeOf( dialog, this );
		return dialog;
	}

	show( msg ) {
		this.setText( text );
		super.show();
	}

	showModal( text ) {
		this.setText( text );
		super.showModal();
	}

	cancel() {
		const cancelEvent = new Event( 'cancel' );
		this.dispatchEvent( cancelEvent );
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

