/**
 * Cash Register Object
 * @constructor
 */
var CashRegister = function() {

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
     * current drawer
     * @type {Object}
     */
    var currentDrawer = [];

    /**
     * The current balance
     * @type int
     */
    var currentBalance = 0;

    /**
     * Resets the drawer
     */
    this.reloadDrawer = function() {
        currentDrawer = JSON.parse(JSON.stringify(initialDrawer));
        currentBalance = currentDrawer.reduce(function(previousValue, currentBill, idx) {
            return previousValue + (currentBill.bill * currentBill.amount);
        }, 0);
    };

    /**
     * Get current drawer
     * @returns {*}
     */
    this.getCurrentDrawer = function() {
        return currentDrawer;
    };

    /**
     * Get specific balances
     *
     * @param bills
     * @returns {Array}
     */
    this.getSpecificDrawerBills = function(bills) {
        var balances = [];
        for (var i = 0, count = bills.length; i < count; i++) {
            var bill = bills[i].replace(/\D/g, '');
            var potential = currentDrawer.filter(function(billContainer) {
                return billContainer.bill == bill;
            });
            if (!potential.length) throw Error('The bill ' + bill + ' was not found');
            balances.push(potential.pop());
        }

        return balances;
    };

    /**
     * withdraw this amount
     *
     * @param amount
     * @returns {Array}
     */
    this.withdraw = function(amount) {
        var total = parseInt(amount.replace(/\D/g, ''));
        if (total > currentBalance) {
            throw Error('insufficient funds');
        }

        var bills = [];
        var pointer = 0;
        while (total > 0) {
            var currentBill = currentDrawer[pointer];

            var numberOfBills = parseInt(total / currentBill.bill);
            if (numberOfBills) {
                currentDrawer[pointer].amount -= numberOfBills;
                var remove = (currentBill.bill * numberOfBills);
                total -= remove;
                currentBalance -= remove;
            }

            pointer++;

            if (pointer == currentDrawer.length) {
                break;
            }
        }

        return bills;
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
        ui.cashRegister.reloadDrawer();
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

        try {
            switch (command.charAt(0)) {
                case 'R':
                    this.cashRegister.reloadDrawer();
                    output = this.formatBalance(this.cashRegister.getCurrentDrawer(), ['Machine balance:']);
                    break;
                case 'I':
                    output = this.formatBalance(this.cashRegister.getSpecificDrawerBills(command.substr(2).split(' ')), []);
                    break;
                case 'W':
                    var withdrawl = command.substr(2);
                    this.cashRegister.withdraw(withdrawl);
                    output = this.formatBalance(this.cashRegister.getCurrentDrawer(), ['Success: Dispensed ' + withdrawl, '', 'Machine balance:']);
                    break;
                case 'Q':
                    this.quit();
                    break;

                default:
                    throw Error('Invalid Command');
            }
        }
        catch (e) {
            output = 'Failure: ' + e.message;
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