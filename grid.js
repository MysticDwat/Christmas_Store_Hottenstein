class Grid {
    constructor(number_of_columns,
                number_of_rows,
                cards){
        this.number_of_columns = number_of_columns || 3;
        this.number_of_rows = number_of_rows || 1;
        this.cards = cards || [];
    }

    draw(id) {
        let grid_element = document.querySelector(`#${id}`);

        grid_element.style.setProperty('--number_of_columns',this.number_of_columns);
        grid_element.style.setProperty('--number_of_rows',this.number_of_rows);

        for (let card of this.cards){
            card.grid_draw(grid_element);
        }
    }
}

class Card {
    constructor(image_source, 
                card_title, 
                card_description,
                card_original,
                card_discount=0,
                card_discounted=false){
        this.image_source = image_source;
        this.card_title = card_title;
        this.card_description = card_description;
        this.card_original = card_original;
        this.card_discount = card_discount;
        this.card_discounted = card_discounted;
    }

    calc_discount() {
        return Math.round((((1 - this.card_discount) * this.card_original) + Number.EPSILON) * 100) / 100;
    }

    grid_draw(grid_element) {
        let card = document.createElement('li');
        card.classList.add('card');

        let image = document.createElement('img');
        image.setAttribute('src',this.image_source);
        image.setAttribute('alt',this.card_title);
        card.appendChild(image);

        let title = document.createElement('h3');
        title.innerHTML = this.card_title;
        card.appendChild(title);

        let description = document.createElement('p');
        description.innerHTML = this.card_description;
        card.appendChild(description);

        let price = document.createElement('p');
        price.innerHTML = '$' + (this.card_discounted ? this.calc_discount() : this.card_original);
        price.classList.add(this.card_discounted ? 'discount' : 'price');
        card.appendChild(price);

        card.onmouseover = () => {
            //card.classList.add('card-hover');
            card.style.setProperty('transform','scale(1.25)');
            card.style.setProperty('box-shadow','0 0 1em 1em crimson');
            card.style.setProperty('z-index','2');
        }

        card.onmouseout = () => {
            //card.classList.remove('card-hover');
            card.style.setProperty('transform','none');
            card.style.setProperty('box-shadow','none');
            card.style.setProperty('z-index','0');
        }

        grid_element.appendChild(card);
    }

    table_draw(id) {
        let table = document.querySelector(`#${id}`);

        let row = document.createElement('tr');
        row.classList.add('full-row');

        let title = document.createElement('td');
        title.innerHTML = this.card_title;
        row.appendChild(title);

        let price = document.createElement('td');
        price.innerHTML = this.card_original;
        row.appendChild(price);

        let discount = document.createElement('td');
        discount.innerHTML = this.calc_discount();
        row.appendChild(discount);

        table.appendChild(row);
    }
}

let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
let cards = [new Card('https://images.unsplash.com/photo-1573757747798-62adbde0f981?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
                  'Bag of Lights',
                  lorem,
                  25,
                  .4,
                  true), 
         new Card('https://images.unsplash.com/photo-1543759616-92ca87aaedd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
                  'Ornament',
                  lorem,
                  15,
                  0.4,
                  true), 
         new Card('https://images.unsplash.com/photo-1638635433608-6759ca175829?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  'Elf Doll',
                  lorem,
                  15,
                  .33,
                  true), 
         new Card('https://images.unsplash.com/photo-1513297887119-d46091b24bfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  'Christmas Tree',
                  lorem,
                  250,
                  .6,
                  true), 
         new Card('https://images.unsplash.com/photo-1487383298905-ee8a6b373ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3d8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
                  'Bucket of Fake Snow',
                  lorem,
                  50,
                  .4,
                  true)]

for(let card of cards) {
    card.table_draw('deals-table');
}

let grid = new Grid(3,2,cards);
grid.draw('deals-grid');