class KnutuCommonLib {
  public static commomLib: KnutuCommonLib = new KnutuCommonLib();
  public static getInstance = (): KnutuCommonLib => this.commomLib;

  public wakeUp = () => {};
}

export default KnutuCommonLib;
