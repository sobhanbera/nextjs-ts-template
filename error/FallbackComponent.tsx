/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - fallback component which will be rendered when any error occurs..
 */

import styles from '../styles/errors/FallbackComponent.module.scss'

interface FallbackComponentProps {
    error: Error
    id: string
}
export default function FallbackComponent(props: FallbackComponentProps) {
    return (
        <div className={styles.errorRoot}>
            <p className={styles.errorId}>Oops ID: {props.id}</p>
            <p className={styles.errorMessage}>Error: {props.error.message}</p>
        </div>
    )
}
