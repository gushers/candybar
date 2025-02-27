import Entity from '../../src/modules/Entity';

class Test extends Entity {
    drawRect({ ctx, bounds, tick }) {
        const x = this.toValue(200);
        const y = this.toValue(200);
        const w = this.toValue(100);
        const h = this.toValue(100);

        ctx.save()
        ctx.translate(x, y);
        ctx.rotate(tick * 0.01);

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-w * 0.5, -h * 0.5, w, h);
        ctx.resetTransform();
        ctx.restore();
        console.log('sadsd')
    }

    draw = context => {
        this.drawRect(context);
    };
}

export default Test;
