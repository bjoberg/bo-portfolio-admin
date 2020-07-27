class NavigationItem {
  constructor({
    identifier, text, icon, route,
  }) {
    this.identifier = identifier;
    this.text = text;
    this.icon = icon;
    this.route = route;
  }

  /**
   * Get the object's details as an object
   * @returns nav item
   */
  getDetails() {
    const {
      identifier, text, icon, route,
    } = this;
    return {
      identifier,
      text,
      icon,
      route,
    };
  }
}

export default NavigationItem;
