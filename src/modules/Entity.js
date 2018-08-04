class Entity {
    dpr = window.devicePixelRatio || 1;
    toValue = value => value * this.dpr;
}

export default Entity;
