type TileData = {
	value: number;
	id: string;
	state?: string;
};
export default class Game2048 {
	data: TileData[][] = [];
	score: number = 0;
	nextId: number = 0;
	moved: boolean = false;
	x: number;
	y: number;
	constructor(x: number = 4, y?: number) {
		if (!y) y = x;
		this.x = x;
		this.y = y;

		this.reset();
	}

	reset() {
		this.data = Array.from({ length: this.y }, () =>
			Array.from({ length: this.x }, (_) => this._newTile(0))
		);
		this.insertTile();
		this.insertTile();
		this.score = 0;
	}

	getData() {
		return JSON.parse(JSON.stringify(this.data));
	}

	getScore() {
		return this.score;
	}

	debug() {
		this.data.map((row) => console.log(row));
	}

	_findZeroCount() {
		return this.data.reduce((prev, curr) => {
			const count = curr.reduce((p, c) => (c.value === 0 ? p + 1 : p), 0);
			return prev + count;
		}, 0);
	}

	isFull() {
		let isAdjacentValues = false;
		for (let i = 0; i < this.y; i++) {
			for (let j = 0; j < this.x - 1; j++) {
				if (this.data[i][j].value === this.data[i][j + 1].value) {
					isAdjacentValues = true;
				}
			}
		}
		for (let i = 0; i < this.y - 1; i++) {
			for (let j = 0; j < this.x; j++) {
				if (this.data[i][j].value === this.data[i + 1][j]?.value) {
					isAdjacentValues = true;
				}
			}
		}

		return this._findZeroCount() === 0 && !isAdjacentValues;
	}

	_getRandomValue() {
		return Math.floor(Math.random() * 4) === 0 ? this._newTile(4, 'new') : this._newTile(2, 'new');
	}

	_newTile(value: number, state: string = 'empty') {
		if (value === 0) return { value, state, id: '' };

		return {
			value,
			state,
			id: 'tile-' + this.nextId++
		};
	}

	insertTile() {
		const zeroCount = this._findZeroCount();

		const index = Math.floor(Math.random() * zeroCount);

		let count = 0;
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data.length; j++) {
				if (this.data[i][j].value === 0) {
					if (count === index) {
						this.data[i][j] = this._getRandomValue();
						return;
					}
					count = count + 1;
				}
			}
		}
	}

	_moveRow(row: TileData[]) {
		row = row.map((r) => ({ value: r.value, id: r.id, state: 'idle' }));
		const moveZero = (row: TileData[]) => {
			const len = row.length;
			row = row.filter((n) => n.value !== 0);
			const result = [...row, ...Array.from({ length: len - row.length }, (_) => this._newTile(0))];
			return result;
		};

		let result = moveZero(row);

		let i = 0;

		while (i < result.length - 1) {
			if (result[i].value === result[i + 1].value) {
				result[i] = { value: result[i + 1].value * 2, id: result[i + 1].id, state: 'merged' };
				this.score += result[i].value;

				result[i + 1] = this._newTile(0, 'empty');
				result = moveZero(result);
			}
			i++;
		}
		return result;
	}

	_moveVertical(matrix: TileData[][]) {
		for (let i = 0; i < matrix.length; i++) {
			let arr = [];
			for (let j = 0; j < matrix[0].length; j++) {
				arr.push(matrix[j][i]);
			}

			const sorted = this._moveRow(arr);
			for (let j = 0; j < matrix[0].length; j++) {
				matrix[j][i] = sorted[j];
			}
		}

		return matrix;
	}

	_getValue(row: TileData[]) {
		return row.map((r) => r.value);
	}
	_dataToString() {
		return JSON.stringify(this.data.map((row) => this._getValue(row)));
	}

	moveLeft() {
		this.moved = false;
		const beforeMove = this._dataToString();
		for (let i = 0; i < this.data.length; i++) {
			const row = this.data[i];
			this.data[i] = this._moveRow(row);
		}
		const afterMove = this._dataToString();
		this.moved = beforeMove !== afterMove;
		if (this.moved) this.insertTile();
	}

	moveRight() {
		this.moved = false;
		const beforeMove = this._dataToString();
		for (let i = 0; i < this.data.length; i++) {
			const row = JSON.parse(JSON.stringify(this.data[i])).reverse();
			this.data[i] = this._moveRow(row).reverse();
		}
		const afterMove = this._dataToString();
		this.moved = beforeMove !== afterMove;
		if (this.moved) this.insertTile();
	}
	moveTop() {
		this.moved = false;
		const beforeMove = this._dataToString();
		this._moveVertical(this.data);
		const afterMove = this._dataToString();
		this.moved = beforeMove !== afterMove;

		if (this.moved) this.insertTile();
	}

	moveBottom() {
		const beforeMove = this._dataToString();
		this._moveVertical(this.data.reverse()).reverse();
		const afterMove = this._dataToString();

		this.moved = beforeMove !== afterMove;
		if (this.moved) this.insertTile();
	}
}
