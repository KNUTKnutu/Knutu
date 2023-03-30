import { Dispatch, FormEvent, SetStateAction } from "react";
import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_quickSearch.module.scss";
  
interface Props {
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

const QuickSearchRoom = ({ setIsShow }: Props) => {

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        /* entering room logic below */
        
        /* entering room logic above */
    }

    return (
        <div className={styles.quickSearchRoom}>
            <div className={styles.title}>
                <h3>빠른 입장</h3>
            </div>
            <div className={styles.main}>
                <form onSubmit={onSubmit}>
                    <div style={{fontSize: "1.25rem"}}>
                        001번 방으로 입장합니다.
                    </div>
                    <div style={{fontSize: "1rem"}}>
                        방 제목: TestingTesting1
                    </div>
                    <div className={styles.btn_wrapper}>
                        <button type="submit">입장</button>
                        <button type="button" onClick={(prev) => setIsShow(!prev)}>
                            나가기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuickSearchRoom;
