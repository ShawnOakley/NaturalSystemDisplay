 
(function(exports) {
 
  /**
   * Creates a new Item.
   *
   * @param {Object} options A map of initial properties.
   * @constructor
   */
  function Item(options) {
 
    if (!options || !options.world || typeof options.world !== 'object') {
      throw new Error('Item: A valid DOM object is required for a new Item.');
    }
 
    this.world = options.world;
    this.name = options.name || 'Item';
    this.id = this.name + exports.System.getNewId();
 
    this.el = document.createElement('div');
    this.el.id = this.id;
    this.el.className = 'item ' + this.name.toLowerCase();
    this.el.style.visibility = 'hidden';
    this.world.el.appendChild(this.el);
  }
 
  /**
   * Initializes the object.
   */
  Item.prototype.init = function(opt_options) {
 
    var options = opt_options || {};
 
    this.acceleration = options.acceleration || new exports.Vector();
    this.velocity = options.velocity || new exports.Vector();
    
    this.maxSpeed = options.maxSpeed || 5;
    this.bounciness = options.bounciness || 0.8;

    this.location = options.location || new exports.Vector(this.world.width / 2, this.world.height / 2);
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.mass = (this.width * this.height) * 0.01;

    this.color = options.color || [0, 0, 0];
    this.visibility = options.visibility || 'visible';

    this.checkWorldEdges = options.checkWorldEdges === undefined ? true : options.checkWorldEdges;

  };
 
  /**
   * Updates properties.
   */
  Item.prototype.step = function() {

    this.applyForce(this.world.wind);
    this.applyForce(this.world.thermal);
    this.applyForce(this.world.gravity);

    this.velocity.add(this.acceleration);
	this.velocity.limit(this.maxSpeed);

    if (this.checkWorldEdges) {
      this._checkWorldEdges();
    }

    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };
 
 /**
  * Adds a force to this object's acceleration.
  *
  * @param {Object} force A Vector representing a force to apply.
  */
  Item.prototype.applyForce = function(force) {
    var vector = this.world.cacheVector;
    vector.x = force.x;
    vector.y = force.y;
    vector.div(this.mass);
    this.acceleration.add(vector);
  };
 
  /**
   * Determines if this object is outside the world bounds.
   * @private
   */
  Item.prototype._checkWorldEdges = function() {
 
    var world = this.world,
        location = this.location,
        velocity = this.velocity,
        width = this.width,
        height = this.height;
 
    if (location.x + width / 2 > world.width) {
      location.x = world.width - width / 2;
      velocity.x *= -1;
    } else if (location.x < width / 2) {
      location.x = width / 2;
      velocity.x *= -1;
    }
 
    if (location.y + height / 2 > world.height) {
      location.y = world.height - height / 2;
      velocity.y *= -1;
    } else if (location.y < height / 2) {
      location.y = height / 2;
      velocity.y *= -1;
    }

    if (location.x + width / 2 > world.width) {
    	location.x = world.width - width / 2;
    	velocity.x *= -1 * this.bounciness;
  }
  };
 
  /**
   * Updates the corresponding DOM element's style property.
   */
  Item.prototype.draw = function() {
    exports.System._draw(this);
  };
 
  exports.Item = Item;
 
}(exports));