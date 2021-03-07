"use strict";

(function () {
	class LoadTable {
		constructor() {
			this._getData();
		}

		// call "api" to get the data
		async _getData() {
			let response = await fetch('tables.json');

			if (response.ok) {
				const data = await response.json();
				this._renderTable(data);
			} else {
				console.log(`Error ${response.status}`);
			}
		}

		_renderTable(data) {
			const tBody = document.getElementById('table-body');
			// attach the body to the DOM
			tBody.appendChild(this._createTableBody(data));
			this._initDataTable();
		}

		_createTableBody(data) {
			const tableBody = document.createDocumentFragment();

			// for each object create a table row by calling _createTableRow and passing a single row
			for (const rowData of data) {
				const tr = this._createTableRow(rowData);
				// append each row to a temporary table body
				tableBody.appendChild(tr);
			}

			return tableBody;
		}

		_createTableRow(rowData) {
			const tr = document.createElement('tr');

			// iterate over the object value and create a cell for each one
			for (const [, value] of Object.entries(rowData)) {
				const td = document.createElement('td');
				td.innerHTML = value;
				//add the cell to the row
				tr.appendChild(td);
			}

			return tr;
		}

		_initDataTable() {
			$('#dataTable').DataTable();
		}
	}

	new LoadTable();

})();