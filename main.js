/**
 * Cash Register Object
 * @constructor
 */
var CashRegister  = function() {

    /**
     * The initial starting drawer
     * @type {object}
     */
    var initialDrawer = [
        {
            'bill': '100',
            'amount':   10
        },
        {
            'bill': '50',
            'amount':   10
        },
        {
            'bill': '20',
            'amount':   10
        },
        {
            'bill': '10',
            'amount':   10
        },
        {
            'bill': '5',
            'amount':   10
        },
        {
            'bill': '1',
            'amount':   10
        }
    ];

    /**
     * Populate drawer the first run
     * @type {Object}
     */
    var currentBalance = initialDrawer;

    /**
     * Get current balance
     * @returns {*}
     */
    this.getCurrentBalance = function() {
        return currentBalance;
    };

    /**
     * Get specific balances
     *
     * @param bills
     * @returns {Array}
     */
    this.getSpecificBalances = function(bills) {
        var balances = [];
        for (var i = 0, count = bills.length; i < count; i++) {
            var bill = bills[i].replace(/\D/g, '');
            var potential = currentBalance.filter(function(billContainer) {
                return billContainer.bill == bill;
            });
            if (!potential.length) throw Error('The bill ' + bill + ' was not found');
            balances.push(potential.pop());
        }

        return balances;
    };

    /**
     * Resets the drawer
     */
    this.reloadDrawer = function() {
        currentBalance = initialDrawer;
    };
};


/**
 * Namespaced "container"
 */
var UserInterface = {
    cashRegister: new CashRegister(),
    form: document.querySelector('#handler'),
    input: document.querySelector('#input'),
    output: document.querySelector('#output'),

    /**
     * Launches this thing
     */
    init: function() {
        var ui = this;
        ui.form.addEventListener('submit', function(e) {
            e.preventDefault();
            var value = this.input.value.toUpperCase();
            ui.output.innerHTML = ui.handleCommand(value);
            ui.input.value = '';
        });
    },

    /**
     * Handles the incoming command
     * @param command
     */
    handleCommand: function(command) {
        var output = '';
        switch (command.charAt(0)) {
            case 'R':
                this.cashRegister.reloadDrawer();
                output = this.formatBalance(this.cashRegister.getCurrentBalance(), ['Machine balance:']);
                break;
            case 'I':
                try {
                    output = this.formatBalance(this.cashRegister.getSpecificBalances(command.substr(2).split(' ')), []);
                }
                catch (e) {
                    output = 'Failure: ' + e.message;
                }
                break;
            case 'Q':
                this.quit();
                break;

            default:
                output = 'Failure: Invalid Command';

        }

        return output;

    },

    /**
     * Formats the balance for output
     * @param balance
     * @param output
     * @returns {string}
     */
    formatBalance: function(balance, output) {
        for (var i = 0, count = balance.length; i < count; i++) {
            output.push('$' + balance[i].bill + ' - ' + balance[i].amount);
        }
        return output.join('<br>');
    },

    /**
     * Shuts it all down
     */
    quit: function() {
        this.input.setAttribute('readonly', true);
        var q = document.createElement('div');
        q.setAttribute('id', 'quit');
        document.body.appendChild(q);
        document.body.style.cursor = 'not-allowed';
    }
};


UserInterface.init();