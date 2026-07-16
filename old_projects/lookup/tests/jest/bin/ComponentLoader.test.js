import ComponentLoader from "bin/ComponentLoader";
import TestComponent from "../__mocks__/TestComponent";

const testOnLoadComponent1 = new TestComponent(true, 1);
const testOnLoadComponent2 = new TestComponent(true, 2);
const testAfterLoadComponent = new TestComponent(false, 5, 50);

beforeAll(() => {
    ComponentLoader.getInstance().register(testAfterLoadComponent);
    ComponentLoader.getInstance().register(testOnLoadComponent2);
    ComponentLoader.getInstance().register(testOnLoadComponent1);
})


test('ComponentLoader_getInstance', () => {
    expect(ComponentLoader.getInstance()).toBeInstanceOf(ComponentLoader)
})

test('ComponentLoader_load -> resolving', async () => {
    await ComponentLoader.getInstance().load();

    expect(testAfterLoadComponent.loaded).toBeFalsy();
    expect(testOnLoadComponent1.loaded).toBeTruthy();
})

test('ComponentLoader_load -> priority order', async () => {
    const result = await ComponentLoader.getInstance().load();

    expect(result[0].resolve).toBe(1);
    expect(result[1].resolve).toBe(2);
    expect(result[2]).toBeUndefined();
})


test('ComponentLoader_load -> delay', async done => {
    await ComponentLoader.getInstance().load();
    // TODO

    setTimeout(() => {
        expect(testAfterLoadComponent.loaded).toBeFalsy();
    },10)

    setTimeout(() => {
        expect(testAfterLoadComponent.loaded).toBeTruthy();
        done();
    }, 50)
})