using UnityEngine;

public class PlaneController : MonoBehaviour
{
    public GameObject plane;

    // Call this method to turn the plane on
    public void TurnOnPlane()
    {
        if (plane != null)
        {
            plane.SetActive(true);
            Debug.Log("Plane has been turned on.");
        }
        else
        {
            Debug.LogError("Plane GameObject not assigned in the inspector.");
        }
    }

    // Call this method to turn the plane off
    public void TurnOffPlane()
    {
        if (plane != null)
        {
            plane.SetActive(false);
            Debug.Log("Plane has been turned off.");
        }
        else
        {
            Debug.LogError("Plane GameObject not assigned in the inspector.");
        }
    }
}