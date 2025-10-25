class Entity {
    dpr = window.devicePixelRatio || 1;
    toValue = (value: number): number => value * this.dpr;
}

export default Entity;

