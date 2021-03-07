(function () {

	class NoteManager {

		constructor() {
			this._noteTypes = {
				public: 'public',
				private: 'private'
			};
			this._type = this._noteTypes.public;
			this._username = 'johnDoe';
			this._sessionStorageNoteKey = 'notes';
			this._privateUserNameRegEx = new RegExp(/\s\@\w/);

			this._publicNotesElement = document.getElementById("public-notes");
			this._privateNotesElement = document.getElementById("private-notes");

			this._privateBtn = document.getElementById("public-btn");
			this._publicBtn = document.getElementById("private-btn");
			this._charCount = document.getElementById('char-count');

			// this#test = 1;
			this._renderNotes();
		}

		addNote() {
			const noteContent = document.getElementById("note-area").value;

			// check if it is a private not and if there is a user name
			if (this._type === this._noteTypes.private && !this._privateUserNameRegEx.test(noteContent)) {
				alert('Private notes must have a username. Please add one');
				return;
			}

			document.getElementById("note-area").value = '';

			// note object to be stored on local storge 
			const noteObject = {
				username: this._username,
				content: noteContent,
				type: this._type,
				date: this._getCurentFormatedDate()
			};

			this._saveNote(noteObject);
			// create a new note element and add it the DOM
			this._renderNewNote(noteObject);
			this._charCount.innerHTML = '1000';
		}

		setNoteType(type) {
			this._type = type;

			// enable or disable note tabs and show or hide notes (public/private)
			if (type === this._noteTypes.public) {
				this._publicNotesElement.style.display = 'block';
				this._privateNotesElement.style.display = 'none';
				this._publicBtn.classList = ''
				this._privateBtn.classList = 'selected';
			} else {
				this._privateNotesElement.style.display = 'block';
				this._publicNotesElement.style.display = 'none';
				this._privateBtn.classList = ''
				this._publicBtn.classList = 'selected';
			}
		}

		getAvailableNoteTypes() {
			return this._noteTypes;
		}

		_saveNote(noteObject) {
			const currentNotes = this._getSavedNotes() || [];
			currentNotes.push(noteObject);
			sessionStorage.setItem(this._sessionStorageNoteKey, JSON.stringify(currentNotes));
		}

		// get notes from session storage
		_getSavedNotes() {
			return JSON.parse(sessionStorage.getItem(this._sessionStorageNoteKey));
		}

		_getCurentFormatedDate() {
			const date = new Date();
			return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes();
		}

		// render notes from session storage if any
		_renderNotes() {
			const currentNotes = this._getSavedNotes();

			if (!currentNotes) {
				return;
			}

			// document fragment to add notes bofore attaching to the DOM
			const publicNotesFragment = document.createDocumentFragment();
			const privateNotesFragment = document.createDocumentFragment();

			for (const note of currentNotes) {
				// create a DOM element for each note
				const noteElement = this._getNoteElement(note);

				// add note to temporary DOM element
				note.type === this._noteTypes.public
					? publicNotesFragment.appendChild(noteElement)
					: privateNotesFragment.appendChild(noteElement);
			}

			// append all elements at once
			this._publicNotesElement.appendChild(publicNotesFragment);
			this._privateNotesElement.appendChild(privateNotesFragment);
		}

		// create note element and return 
		_getNoteElement(note) {
			const noteType = document.createElement("span");
			noteType.innerHTML = note.type;
			const noteTypeClasses = note.type === this._noteTypes.public ? 'note-type note-public' : 'note-type note-private';
			noteType.classList = noteTypeClasses;

			const noteDate = document.createElement("span");
			noteDate.innerHTML = `Created by ${note.username} on ${note.date}`;
			noteDate.classList = 'note-date';

			const noteHeader = document.createElement("div");
			noteHeader.classList = 'note-header';
			noteHeader.appendChild(noteType);
			noteHeader.appendChild(noteDate);

			const noteContent = document.createElement("div");
			noteContent.classList = 'note-content';

			const noteUsername = document.createElement("span");
			noteUsername.innerHTML = `@${note.username}`;
			noteUsername.classList = 'note-username';

			const noteMessage = document.createElement("span");
			noteMessage.innerHTML = note.content;
			noteMessage.classList = 'note-message';

			noteContent.appendChild(noteUsername);
			noteContent.appendChild(noteMessage);

			const noteContainer = document.createElement("div");
			noteContainer.classList = 'note';

			// add each element to the note container
			noteContainer.appendChild(noteHeader);
			noteContainer.appendChild(noteContent);

			return noteContainer;
		}

		// add a single note to the DOM after user clicks on 'add note' 
		_renderNewNote(noteObject) {
			const noteElement = this._getNoteElement(noteObject);

			noteObject.type === this._noteTypes.public
				? this._publicNotesElement.appendChild(noteElement)
				: this._privateNotesElement.appendChild(noteElement);
		}
	}

	window.noteManager = new NoteManager();
})();