class KnutuCommonLib {
  public static commomLib: KnutuCommonLib = new KnutuCommonLib();
  public static getInstance = (): KnutuCommonLib => this.commomLib;

  public wakeUp = () => {
    /* 보류 */
  };
}

export default KnutuCommonLib;
